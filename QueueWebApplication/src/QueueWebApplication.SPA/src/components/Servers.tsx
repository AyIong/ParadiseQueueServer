import { type ReactNode, useEffect, useState } from 'react';
import type { PlayerData, PlayerJwt, Server } from '../common/interfaces';
import { ServerCard } from '../components/ServerCard';
import { useServersService } from '../servers-services';

function parsePlayerData(data: PlayerJwt): PlayerData {
  return {
    ckey: data.sub,
    role: data.role,
    donatorTier: data.donTier,
    banned: data.ban,
    whitelistPasses: data.wl,
  };
}

export function Servers() {
  const [haveToken, setHaveToken] = useState(false);
  const [playerData, setPlayerData] = useState<PlayerData>({
    ckey: 'pepega',
    role: 'nobody',
    donatorTier: 0,
    banned: false,
    whitelistPasses: [],
  });

  const [updatedServers, setUpdatedServers] = useState<Server[]>([]);
  const { servers, serversStatus, queuePosition } = useServersService(import.meta.env.PROD);

  useEffect(() => {
    const token = window.location.hash.split('#token=').pop();
    if (!token) {
      return;
    }

    sessionStorage.setItem('token', token);
    const payload = JSON.parse(atob(token.split('.')[1])) as PlayerJwt;
    setPlayerData(parsePlayerData(payload));
    setHaveToken(true);
  }, []);

  useEffect(() => {
    if (servers.length && (haveToken || !import.meta.env.PROD)) {
      setUpdatedServers(servers);
    }
  }, [servers, haveToken]);

  useEffect(() => {
    if (!serversStatus.length) {
      return;
    }

    setUpdatedServers((prev) =>
      prev.map((server) => {
        const status = serversStatus.find((serv) => serv.name === server.name);
        return status ? { ...server, currentPlayers: status.currentPlayers } : server;
      }),
    );
  }, [serversStatus]);

  useEffect(() => {
    if (!queuePosition) {
      return;
    }

    setUpdatedServers((prev) =>
      prev.map((server) =>
        server.name === queuePosition.serverName ? { ...server, queuePosition: queuePosition.position } : server,
      ),
    );
  }, [queuePosition]);

  let children: string | ReactNode;
  if (!haveToken && import.meta.env.PROD) {
    children = <div>This site is available only through our byond queue server</div>;
  } else if (updatedServers.length) {
    children = updatedServers.map((server) => <ServerCard key={server.name} server={server} playerData={playerData} />);
  } else {
    children = 'Backend is not available now...';
  }

  return <div className="Servers">{children}</div>;
}
