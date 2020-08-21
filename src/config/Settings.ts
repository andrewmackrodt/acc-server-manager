import { ConfigFile } from './ui/ConfigFile'
import { Description, IsEnum, IsNotEmpty, IsNumber, IsString, Max, Min, MinLength } from '../helpers/decorators'

export enum CarGroup {
    FREE_FOR_ALL = 'FreeForAll',
    GT3 = 'GT3',
    GT4 = 'GT4',
    PORSCHE_CUP = 'Cup',
    LAMBORGHINI_SUPERTROFEO = 'ST',

}

export enum FormationLapType {
    /** default formation lap with position control and UI */
    DEFAULT = 3,

    /** old limiter lap */
    OLD = 0,

    /** free (replaces /manual start), only usable for private servers */
    FREE = 1,
}

export class Settings extends ConfigFile {
    @Description(`The server name displayed in the ACC UI pages.`)
    @IsString()
    @MinLength(1)
    @IsNotEmpty()
    public serverName: string = 'ACC Server (please edit settings.json)'

    @Description(`Password to elevate via "Server admin commands"`)
    @IsString()
    @IsNotEmpty()
    public adminPassword: string = ''

    @Description(`
        Defines the car group for this server. Possible values are
        "FreeForAll", "GT3", "GT4", "Cup", "ST"
        where "FreeForAll" will allow any driver to join with any car
        (that he defined as Primary Car).
        
        GT3, GT4, Cup, ST will restrict this server to GT3, GT4,
        Porsche Cup or Lamborghini Supertrofeo.`)
    @IsEnum(CarGroup)
    @IsNotEmpty()
    public carGroup: CarGroup = CarGroup.FREE_FOR_ALL

    @Description(`
        Defines the amount of track medals that a user has to have for
        the given track (values 0, 1, 2, 3).`)
    @IsNumber()
    @Min(0)
    @Max(3)
    @IsNotEmpty()
    public trackMedalsRequirement: number = 0

    @Description(`
        Defines the Safety Rating (SR) that a user must have to join this 
        server (values -1, 0, .... 99).`)
    @IsNumber()
    @Min(-1)
    @Max(99)
    @IsNotEmpty()
    public safetyRatingRequirement: number = -1

    @Description(`
        Defines the Racecraft Rating (RC) that a user must have to join this 
        server (values -1, 0, .... 99).`)
    @IsNumber()
    @Min(-1)
    @Max(99)
    @IsNotEmpty()
    public racecraftRatingRequirement: number = -1

    @Description(`
        Password required to enter this server. If a password is set, the 
        server is declared "Private Multiplayer".`)
    @IsString()
    @IsNotEmpty()
    public password: string = ''

    @Description(`
        Password to enter the server as spectator. Must be different to 
        "password" if both is set.`)
    @IsString()
    @IsNotEmpty()
    public spectatorPassword: string = ''

    @Description(`
        Replaces "maxClientsOverride" and "spectatorSlots". Defines 
        the amount of car slots the server can occupy; this value is 
        overridden if the pit count of the track is lower, or with 30 for 
        public MP. The gap between maxCarSlots and maxConnections 
        defines how many spectators or other irregular connections (ie 
        entry list entries) can be on the server.`)
    @IsNumber()
    @Min(1)
    @Max(30)
    public maxCarSlots?: number

    @Description(`
        If set to 1, any session will write down the result leaderboard in 
        a "results" folder (must be manually created). See "Session 
        results".`)
    @IsNumber()
    @Min(0)
    @Max(1)
    @IsNotEmpty()
    public dumpLeaderboards: number = 0

    @Description(`
        Will save an entry list at the end of any Qualifying session. This 
        can be a quick way to collect a starting point to build an entry 
        list, and is a way to save the defaultGridPositions which can be 
        used to run a race without Qualifying session and predefined 
        grid. Also see the corresponding admin command.`)
    @IsNumber()
    @Min(0)
    @Max(1)
    @IsNotEmpty()
    public dumpEntryList: number = 0

    @Description(`
        If set to 0, the server will allow joining during a race session. Is 
        not useful in "Public Multiplayer", as the user-server matching 
        will ignore ongoing race sessions.`)
    @IsNumber()
    @Min(0)
    @Max(1)
    @IsNotEmpty()
    public isRaceLocked: number = 1

    @Description(`Not documented.`)
    @IsNumber()
    @Min(0)
    @Max(1)
    public isPrepPhaseLocked?: number //default = 0

    @Description(`
        If set to 1, the server will change to a random track when the 
        last drivers leaves (which causes a reset to FP1). The "track" 
        property will only define the default state for the first session.`)
    @IsNumber()
    @Min(0)
    @Max(1)
    public randomizeTrackWhenEmpty?: number

    @Description(`
        If set to 0, the server won’t automatically disqualify drivers, and 
        instead hand out Stop&Go (30s) penalties. This way a server 
        admin / race director has 3 laps time to review the incident, and 
        either use /dq or /clear based on his judgement.`)
    @IsNumber()
    @Min(0)
    @Max(1)
    public allowAutoDQ?: number

    @Description(`
        Toggles the short and long formation lap. Long formation is 
        only usable on private servers.`)
    @IsNumber()
    @Min(0)
    @Max(1)
    @IsNotEmpty()
    public shortFormationLap: number = 1

    @Description(`
        Toggles the formation lap type that is permanently used on this server:<br>
        3 - default formation lap with position control and UI<br>
        0 - old limiter lap<br>
        1 - free (replaces /manual start), only usable for private servers")`)
    @IsEnum(FormationLapType)
    @IsNotEmpty()
    public formationLapType: FormationLapType = FormationLapType.DEFAULT

    @Description(`Not documented.`)
    @IsNumber()
    public doDriverSwapBroadcast?: number //default = 1

    @Description(`
        Can override the default entryList path "cfg/entrylist.json", so
        multiple ACC servers on the machine can use the same entrylist
        (and custom car files). Set a full path like
        "C:/customEntryListSeriesA/", where the entrylist is stored.

        Attention: The path separators have to be slashes (/),
        backslashes (\\) will not work.`)
    @IsString()
    @IsNotEmpty()
    public centralEntryListPath: string = ''
}
