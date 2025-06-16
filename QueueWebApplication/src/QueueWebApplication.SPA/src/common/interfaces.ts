export interface PlayerData {
  ckey: string;
  role: string;
  donatorTier: number;
  banned: boolean;
  whitelistPasses: number[];
}

export interface PlayerJwt {
  sub: string;
  role: string;
  donTier: number;
  ban: boolean;
  wl: number[];
  nbf: number;
  exp: number;
  iat: number;
  iss: string;
  aud: string;
}

export interface QueuePosition {
  serverName: string;
  position: number;
}

export interface ServerStatus {
  name: string;
  currentPlayers: number;
}

export interface Server {
  name: string;
  ipAddress: string;
  port: number;
  currentPlayers: number;
  maximumPlayers: number;
  queuePosition: number;
  whitelisted: boolean;
}

export interface IServersService {
  getAllServers(): Promise<Server[]>;
}
