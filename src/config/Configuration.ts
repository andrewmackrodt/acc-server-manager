import { ConfigFile } from './ui/ConfigFile'
import { Description, IsNotEmpty, IsNumber, Max, Min } from '../helpers/decorators'

export class Configuration extends ConfigFile {
    @Description(`
        Connected clients will use this Port to stream the car positions and is used
        for the ping test. In case you never see your server getting a ping value, this
        indicates that the udpPort is not accessible.`)
    @IsNumber()
    @Min(1024)
    @Max(65535)
    @IsNotEmpty()
    public udpPort: number = 9231

    @Description(`ACC clients will use this port to establish a connection to the server.`)
    @IsNumber()
    @Min(1024)
    @Max(65535)
    @IsNotEmpty()
    public tcpPort: number = 9232

    @Description(`
        Replaces "maxClients". The maximum amount of connections a server will
        accept at a time. If you own the hardware server, you can just set any high
        number you want. If you rented a 16 or 24 slot server, your Hosting Provider
        probably has set this here and doesn’t give you write-access to this
        configuration file.`)
    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    public maxConnections: number = 85

    @Description(`
        When 0, this server won’t register to the backend. Is useful for LAN
        sessions. If 0, the server is declared "Private Multiplayer".`)
    @IsNumber()
    @Min(0)
    @Max(1)
    @IsNotEmpty()
    public registerToLobby: number = 1

    @Description(`
        Defines if the server will listen to LAN discovery requests. Can be turned
        off for dedicated servers.`)
    @IsNumber()
    @Min(0)
    @Max(1)
    public lanDiscovery?: number
}
