import { ConfigFile } from './ui/ConfigFile'
import { Description, IsBoolean, IsEnum, IsNotEmpty, IsNumber, Min } from '../helpers/decorators'

export enum QualifyStandingType {
    /** default */
    FASTEST_LAP = 1,

    /** endurance mode for multiple qualifying sessions (not supported) */
    AVERAGE_LAP = 2,
}

export class EventRules extends ConfigFile {
    @Description(`Use 1 (fastest lap), 2 (average lap) is not yet officially supported.`)
    @IsNumber()
    @IsEnum(QualifyStandingType)
    @IsNotEmpty()
    public qualifyStandingType: QualifyStandingType = QualifyStandingType.FASTEST_LAP

    @Description(`Not documented.`)
    @IsNumber()
    public superpoleMaxCar?: number // default = -1

    @Description(`
        Defines a pit window at the middle of the race.
        Obviously covers the Sprint series format. -1 will
        disable the pit window. Use this combined with a
        mandatoryPitstopCount = 1.`)
    @IsNumber()
    @Min(-1)
    @IsNotEmpty()
    public pitWindowLengthSec: number = -1

    @Description(`
        Defines the maximum time a driver can stay out
        without getting a penalty. Can be used to balance
        fuel efficient cars in endurance races. The stint
        time resets in the pitlane, no real stop is required.

        -1 will disable the stint times.`)
    @IsNumber()
    @Min(-1)
    @IsNotEmpty()
    public driverStintTimeSec: number = -1

    @Description(`Defines if refuelling is allowed during the race pitstops.`)
    @IsBoolean()
    @IsNotEmpty()
    public isRefuellingAllowedInRace: boolean = true

    @Description(`
        If set to true, any refuelling will take the same
        amount of time. If turned off, refuelling will
        consume time linear to the amount refuelled. Very
        useful setting to balance fuel efficient cars,
        especially if combined with other features.`)
    @IsBoolean()
    @IsNotEmpty()
    public isRefuellingTimeFixed: boolean = false

    @Description(`
        In driver swap situations, set this to the maximum
        number of drivers on a car. When an entry has
        fewer drivers than maxDriversCount,
        maxTotalDrivingTime is automatically
        compensated so that those "smaller" entries are
        also able to complete the race.

        Example: 3H race length, 65 minutes
        driverStintTimeSec and 65 minutes
        maxTotalDrivingTime will result in 65 minutes of
        maxTotalDrivingTime for entries of 3 and 105 (!)
        minutes for entries of 2.`)
    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    public maxDriversCount: number = 1

    @Description(`
        Defines the basic mandatory pit stops. If the value
        is greater zero, any car that did not execute the
        mandatory pitstops will be disqualified at the end
        of the race. The necessary actions can be further
        configured using the "isMandatoryPitstopXYRequired"
        properties. A value of zero disables the feature.`)
    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    public mandatoryPitstopCount: number = 0

    @Description(`
        Restricts the maximum driving time for a single
        driver. Is only useful for driver swap situations and
        allows to enforce a minimum driving time for each
        driver (IRL this is used to make sure mixed teams
        like Pro/Am have a fair distributions of the slower
        drivers). -1 disables the feature.

        Will set the maximum driving time for the team
        size defined by "maxDriversCount", always make
        sure both are set.`)
    @IsNumber()
    @Min(-1)
    @IsNotEmpty()
    public maxTotalDrivingTime: number = -1

    @Description(`Defines if a mandatory pitstop requires refuelling.`)
    @IsBoolean()
    @IsNotEmpty()
    public isMandatoryPitstopRefuellingRequired: boolean = false

    @Description(`Defines if a mandatory pitstop requires changing tyres.`)
    @IsBoolean()
    @IsNotEmpty()
    public isMandatoryPitstopTyreChangeRequired: boolean = false

    @Description(`
        Defines if a mandatory pitstop requires a driver
        swap. Will only be effective for cars in driver swap
        situations; even in a mixed field this will be
        skipped for cars with a team size of 1 driver.`)
    @IsBoolean()
    @IsNotEmpty()
    public isMandatoryPitstopSwapDriverRequired: boolean = false

    @Description(`Not documented.`)
    @IsNumber()
    public tyreSetCount?: number // default = 50
}
