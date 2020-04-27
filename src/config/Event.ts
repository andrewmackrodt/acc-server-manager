import { ConfigFile } from './ui/ConfigFile'
import { Session } from './Session'
import { Description, IsEnum, IsNotEmpty, IsNumber, Max, Min } from '../helpers/decorators'

export enum Track {
    MONZA = 'monza',
    ZOLDER = 'zolder',
    BRANDS_HATCH = 'brands_hatch',
    SILVERSTONE = 'silverstone',
    PAUL_RICARD = 'paul_ricard',
    MISANO = 'misano',
    SPA = 'spa',
    NURBURGRING = 'nurburgring',
    BARCELONA = 'barcelona',
    HUNGARORING = 'hungaroring',
    ZANDVOORT = 'zandvoort',
    MONZA_2019 = 'monza_2019',
    ZOLDER_2019 = 'zolder_2019',
    BRANDS_HATCH_2019 = 'brands_hatch_2019',
    SILVERSTONE_2019 = 'silverstone_2019',
    PAUL_RICARD_2019 = 'paul_ricard_2019',
    MISANO_2019 = 'misano_2019',
    SPA_2019 = 'spa_2019',
    NURBURGRING_2019 = 'nurburgring_2019',
    BARCELONA_2019 = 'barcelona_2019',
    HUNGARORING_2019 = 'hungaroring_2019',
    ZANDVOORT_2019 = 'zandvoort_2019',
    KYALAMI_2019 = 'kyalami_2019',
    MOUNT_PANORAMA_2019 = 'mount_panorama_2019',
    SUZUKA_2019 = 'suzuka_2019',
    LAGUNA_SECA_2019 = 'laguna_seca_2019',
}

export enum EventType {
    ENDURANCE_3H = 'E_3h',
    ENDURANCE_6H = 'E_6h',
    ENDURANCE_24H = 'E_24h',
    SPRINT = 'Sprint',
}

export class Event extends ConfigFile {
    @Description(`
        The track we run, see "Track name list". Setting a wrong value
        will also print out the available track keys in the log. With the
        1.1 update containing the 2019 season content, each track has a
        _2019 variant. Using this track will set the BoP and track grip
        correspondingly.`)
    @IsEnum(Track)
    @IsNotEmpty()
    public track: Track = Track.MOUNT_PANORAMA_2019

    @Description(`A user defined string that will be transferred to the result outputs.`)
    @IsNotEmpty()
    public metaData: string = Track.MOUNT_PANORAMA_2019

    @Description(`Not documented.`)
    @IsEnum(EventType)
    @IsNotEmpty()
    public eventType: EventType = EventType.ENDURANCE_6H

    @Description(`Preparation time before a race. Cannot be less than 30s.`)
    @IsNumber()
    @Min(30)
    @IsNotEmpty()
    public preRaceWaitingTimeSeconds: number = 80

    @Description(`
        The time after the last driver is finished (or the
        sessionOverTimeSeconds passed) in Q sessions and the race
        start.
        
        Should not be set to 0, otherwise grid spawning is not secure.`)
    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    public postQualySeconds: number = 10

    @Description(`
        Additional time after the race ended for everyone, before the
        next race weekend starts.`)
    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    public postRaceSeconds: number = 15

    @Description(`
        Time after that a session is forcibly closing after the timer
        reached 0:00. Something like 107% of the expected laptime is
        recommended (careful: default 2 minutes does not properly
        cover tracks like Spa or Silverstone).`)
    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    public sessionOverTimeSeconds: number = 120

    @Description(`Sets the baseline ambient temperature in °C, see "Race weekend simulation".`)
    @IsNumber()
    @IsNotEmpty()
    public ambientTemp: number = 22

    @Description(`
        Obsolete: Track temperatures are always simulated based on
        ambient temperature, sun angle, clouds and other aspects.`)
    @IsNumber()
    @IsNotEmpty()
    public trackTemp: number = 30

    @Description(`
        Sets the baseline cloud level, see "Race weekend simulation".
        Values (0.0, 0.1, .... 1.0).`)
    @IsNumber({ decimals: 17 }) // todo is 1 dp sufficient
    @Min(0)
    @Max(1)
    @IsNotEmpty()
    public cloudLevel: number = 0.1 // default is 0.0000000149011612

    @Description(`
        If weather randomness is off, defines the static rain level. With
        dynamic weather, it increases the rain chance.
        Values (0.0, 0.1, .... 1.0).`)
    @IsNumber({ decimals: 1 })
    @Min(0)
    @Max(1)
    @IsNotEmpty()
    public rain: number = 0.0

    @Description(`
        Sets the dynamic weather level, see "Race weekend simulation".<br>
        0 = static weather<br>
        1-4 = fairly realistic weather<br>
        5-7 = more sensational (but less chaotic compared to versions before 1.0.7)`)
    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    public weatherRandomness: number = 1

    @Description(`A list of session objects.`)
    public sessions: Session[] = [
        Session.createPracticeSession(),
        Session.createQualifySession(),
        Session.createRaceSession(),
    ]
}
