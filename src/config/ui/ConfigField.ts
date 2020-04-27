interface ConfigFieldMetadata {
    description?: string
    isBoolean?: true
    isEnum?: { values: object }
    isNumber?: { decimals: number }
    isString?: true
    isNotEmpty?: true
    min?: number
    max?: number
}

export class ConfigField {
    public readonly name: string
    protected readonly metadata: ConfigFieldMetadata

    public constructor(name: string, metadata: ConfigFieldMetadata) {
        this.name = name
        this.metadata = metadata
    }

    public get description(): string {
        return this.metadata.description || 'Not documented.'
    }

    public get isBoolean(): boolean {
        return !! this.metadata.isBoolean
    }

    public get isEnum(): boolean {
        return !! this.metadata.isEnum
    }

    public get isNumber(): boolean {
        return !! this.metadata.isNumber || this.isNumberBoolean
    }

    public get isNumberBoolean(): boolean {
        return this.metadata.isNumber?.decimals === 0 && this.metadata.min === 0 && this.metadata.max === 1
    }

    public get isString(): boolean {
        return !! this.metadata.isString
    }

    public get isRequired(): boolean {
        return !! this.metadata.isNotEmpty
    }

    public get decimals(): number | undefined {
        return this.metadata.isNumber?.decimals
    }

    public get enum(): object | undefined {
        return this.metadata.isEnum?.values
    }

    public get min(): number | undefined {
        return this.metadata.min
    }

    public get max(): number | undefined {
        return this.metadata.max
    }
}
