import { ConfigFile } from './ui/ConfigFile'
import { Description, IsNotEmpty, IsNumber, Min, Max } from '../helpers/decorators'

export class AssistRules extends ConfigFile {
    @Description(`
        Set's the maximum % of SC that can be used. In
        case a client has a higher SC set than allowed by
        the server, he will only run what is allowed (25%
        in this example). Obviously setting this property to
        0 removes all SC, including mouse and keyboard
        users.

        The Stability Control is an artificial driving aid
        that allows the car to act out of the physics
        boundaries, and highly recommended to overcome
        input methods like Keyboards, Gamepads and
        Mouse steering. However, there is a built-in effect
        that makes the SC performance inferior, so in
        theory using (and relying) on SC is already more
        than enough penalty, and the way to improve
        performance is to practice driving without.`)
    @IsNumber()
    @Min(0)
    @Max(100)
    @IsNotEmpty()
    public stabilityControlLevelMax: number = 100

    @Description(`
        Disables the steering aid that is only available for
        gamepad controllers. Unlike SC, this works inside
        the physics and does not allow unrealistic driving
        behaviour – except that this is a very strong aid
        with superhuman feeling for grip and high reaction
        speed. There is a built-in penalty that should
        balance the driving performance in most cases, and
        give an incentive to learn not to use the driving aid.`)
    @IsNumber()
    @Min(0)
    @Max(1)
    @IsNotEmpty()
    public disableAutosteer: number = 0

    @Description(`Forces the equivalent assist option to "off".`)
    @IsNumber()
    @Min(0)
    @Max(1)
    @IsNotEmpty()
    public disableAutoLights: number = 0

    @Description(`Forces the equivalent assist option to "off".`)
    @IsNumber()
    @Min(0)
    @Max(1)
    @IsNotEmpty()
    public disableAutoWiper: number = 0

    @Description(`Forces the equivalent assist option to "off".`)
    @IsNumber()
    @Min(0)
    @Max(1)
    @IsNotEmpty()
    public disableAutoEngineStart: number = 0

    @Description(`Forces the equivalent assist option to "off".`)
    @IsNumber()
    @Min(0)
    @Max(1)
    @IsNotEmpty()
    public disableAutoPitLimiter: number = 0

    @Description(`Forces the equivalent assist option to "off".`)
    @IsNumber()
    @Min(0)
    @Max(1)
    @IsNotEmpty()
    public disableAutoGear: number = 0

    @Description(`Forces the equivalent assist option to "off".`)
    @IsNumber()
    @Min(0)
    @Max(1)
    @IsNotEmpty()
    public disableAutoClutch: number = 0

    @Description(`Forces the equivalent assist option to "off".`)
    @IsNumber()
    @Min(0)
    @Max(1)
    @IsNotEmpty()
    public disableIdealLine: number = 0
}
