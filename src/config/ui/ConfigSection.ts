import { ConfigField } from './ConfigField'
import { getClassMetadata } from '../../core/reflect-metadata'

export abstract class ConfigSection {
    public fields<T extends this>(): Record<keyof T & string, ConfigField> {
        const result: Record<string, ConfigField> = {}

        for (
            let fn = Object.getPrototypeOf(this).constructor, proto = fn.prototype;
            proto;
            fn = Object.getPrototypeOf(fn), proto = fn.prototype
        ) {
            for (const [field, metadata] of Object.entries(getClassMetadata(proto).properties)) {
                result[field as string] = new ConfigField(field, metadata)
            }
        }

        return result
    }
}
