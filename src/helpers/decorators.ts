import {
    Equals as _Equals,
    IsBoolean as _IsBoolean,
    IsEnum as _IsEnum,
    IsNotEmpty as _IsNotEmpty,
    IsNumber as _IsNumber,
    IsString as _IsString,
    Max as _Max,
    Min as _Min,
    MinLength as _MinLength,
} from 'class-validator'

export function Description(text: string): Function {
    text = text.replace(/\n{2,}/g, '\0')
        .replace(/\n/g, ' ')
        .replace(/<br ?\/?>/g, '\n')
        .replace(/[\t ]{2,}/g, ' ')
        .replace(/\0/g, '\n\n')
        .trim()

    return (target: Record<string, any>, propertyKey: string) => {
        Reflect.defineMetadata('description', text, target, propertyKey)
    }
}

export function Equals(value: number): Function {
    return (target: Record<string, any>, propertyKey: string) => {
        Reflect.defineMetadata('equals', value, target, propertyKey)

        return _Equals(value)(target, propertyKey)
    }
}

export function IsBoolean(): Function {
    return (target: Record<string, any>, propertyKey: string) => {
        Reflect.defineMetadata('isBoolean', true, target, propertyKey)

        return _IsBoolean()(target, propertyKey)
    }
}

export function IsEnum(value: object): Function {
    return (target: Record<string, any>, propertyKey: string) => {
        Reflect.defineMetadata('isEnum', { values: value }, target, propertyKey)

        return _IsEnum(value)(target, propertyKey)
    }
}

export function IsNotEmpty(): Function {
    return (target: Record<string, any>, propertyKey: string) => {
        Reflect.defineMetadata('isNotEmpty', true, target, propertyKey)

        return _IsNotEmpty()(target, propertyKey)
    }
}

export function IsNumber(options?: { decimals?: number }): Function {
    return (target: Record<string, any>, propertyKey: string) => {
        if ( ! options) options = {}
        if ( ! options.decimals) options.decimals = 0
        Reflect.defineMetadata('isNumber', options, target, propertyKey)

        return _IsNumber({ maxDecimalPlaces: options?.decimals })(target, propertyKey)
    }
}

export function IsString(): Function {
    return (target: Record<string, any>, propertyKey: string) => {
        Reflect.defineMetadata('isString', true, target, propertyKey)

        return _IsString()(target, propertyKey)
    }
}

export function Max(value: number): Function {
    return (target: Record<string, any>, propertyKey: string) => {
        Reflect.defineMetadata('max', value, target, propertyKey)

        return _Max(value)(target, propertyKey)
    }
}

export function Min(value: number): Function {
    return (target: Record<string, any>, propertyKey: string) => {
        Reflect.defineMetadata('min', value, target, propertyKey)

        return _Min(value)(target, propertyKey)
    }
}

export function MinLength(value: number): Function {
    return (target: Record<string, any>, propertyKey: string) => {
        Reflect.defineMetadata('minLength', value, target, propertyKey)

        return _MinLength(value)(target, propertyKey)
    }
}
