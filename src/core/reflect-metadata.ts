import 'reflect-metadata'

// reference to the original Reflect.defineMetadata method
const defineMetadata = Reflect.defineMetadata

class HashMap<T, U> {
    protected readonly keys: T[] = []
    protected readonly values: U[] = []

    public get(key: T, defaultValue?: U): U {
        let index = this.keys.indexOf(key)
        if (index === -1 && typeof defaultValue !== 'undefined') {
            this.put(key, defaultValue)
            index = this.values.length - 1
        }
        return this.values[index]
    }

    public put(key: T, value: U) {
        const index = this.keys.indexOf(key)
        if (index == -1) {
            this.keys.push(key)
            this.values.push(value)
        } else {
            this.values[index] = value
        }
    }
}

interface ObjectMetadata {
    metadata: Record<string | symbol, any>
    properties: Record<string | symbol, Record<string, any>>
}

const objects = new HashMap<object, ObjectMetadata>()

Reflect.defineMetadata = (metadataKey: any, metadataValue: any, target: object, propertyKey?: string | symbol): void => {
    const objectMetadata = objects.get(target, {
        metadata: {},
        properties: {},
    })

    if (propertyKey) {
        let metadata = Reflect.get(objectMetadata.properties, propertyKey)
        if (typeof metadata === 'undefined') {
            metadata = {}
            Reflect.set(objectMetadata.properties, propertyKey, metadata)
        }
        Reflect.set(metadata, metadataKey, metadataValue)
        defineMetadata(metadataKey, metadataValue, target, propertyKey)
    } else {
        Reflect.set(objectMetadata.metadata, metadataKey, metadataValue)
        defineMetadata(metadataKey, metadataValue, target)
    }
}

export function getClassMetadata(target: Function | object): ObjectMetadata {
    if ( ! ('constructor' in target) || typeof target.constructor !== 'function') {
        target = Object.getPrototypeOf(target)
    }

    return objects.get(target, { metadata: {}, properties: {} })
}

export function getPropertiesWithMetadataKey<T extends object>(target: T, metadataKey: string): Record<keyof T, string> {
    const classMetadata = getClassMetadata(target)

    return Object.entries(classMetadata.properties).reduce((res, [propertyKey, propertyMetadata]) => {
        if (metadataKey in propertyMetadata) {
            res[propertyKey as keyof T] = propertyMetadata.description
        }
        return res
    }, {} as Record<keyof T, string>)
}
