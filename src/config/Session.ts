import { ConfigSection } from './ui/ConfigSection'
import { Description, IsEnum, IsNotEmpty, IsNumber, Max, Min } from '../helpers/decorators'

export enum SessionType {
    PRACTICE = 'P',
    QUALIFYING = 'Q',
    RACE = 'R',
}

export enum DayOfWeekend {
    FRIDAY = 1,
    SATURDAY = 2,
    SUNDAY = 3,
}

export class Session extends ConfigSection {
    @Description(`Session starting hour of the day (values 0 - 23).`)
    @IsNumber()
    @Min(0)
    @Max(23)
    @IsNotEmpty()
    public hourOfDay: number = 6

    @Description(`Race day (1 = Friday, 2 = Saturday, 3 = Sunday) – relevant to the grip and weather simulation.`)
    @IsEnum(DayOfWeekend)
    @IsNotEmpty()
    public dayOfWeekend: DayOfWeekend = DayOfWeekend.FRIDAY

    @Description(`Rate at which the session time advances in realtime. Values 0, 1, ... 24.`)
    @IsNumber()
    @Min(0)
    @Max(24)
    @IsNotEmpty()
    public timeMultiplier: number = 1

    @Description(`Race session type: P, Q, R for (P)ractice, (Q)ualy, (R)ace.`)
    @IsEnum(SessionType)
    @IsNotEmpty()
    public sessionType: SessionType = SessionType.PRACTICE

    @Description(`Session duration in minutes.`)
    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    public sessionDurationMinutes: number = 10

    public static createPracticeSession(): Session {
        const session = new this()
        session.hourOfDay = 6
        session.dayOfWeekend = DayOfWeekend.FRIDAY
        session.timeMultiplier = 1
        session.sessionType = SessionType.PRACTICE
        session.sessionDurationMinutes = 10

        return session
    }

    public static createQualifySession(): Session {
        const session = new this()
        session.hourOfDay = 12
        session.dayOfWeekend = DayOfWeekend.FRIDAY
        session.timeMultiplier = 1
        session.sessionType = SessionType.QUALIFYING
        session.sessionDurationMinutes = 10

        return session
    }

    public static createRaceSession(): Session {
        const session = new this()
        session.hourOfDay = 18
        session.dayOfWeekend = DayOfWeekend.SATURDAY
        session.timeMultiplier = 2
        session.sessionType = SessionType.RACE
        session.sessionDurationMinutes = 20

        return session
    }
}
