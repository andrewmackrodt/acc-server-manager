import { ConfigSection } from './ConfigSection'
import { Description, Equals, IsNotEmpty, IsNumber } from '../../helpers/decorators'

export abstract class ConfigFile extends ConfigSection {
    @Description(`Not used.`)
    @IsNumber()
    @Equals(1)
    @IsNotEmpty()
    public configVersion: number = 1
}
