import * as signalR from '@microsoft/signalr';
import { useEffect, useState } from 'react';
import type { QueuePosition, Server, ServerStatus } from './common/interfaces';

const mockServers: Server[] = [
  {
    name: 'Green',
    maximumPlayers: 100,
    whitelisted: false,
    port: 4002,
    ipAddress: 's1.ss220.club',
    currentPlayers: 40,
    queuePosition: 0,
  },
  {
    name: 'Black',
    maximumPlayers: 100,
    whitelisted: false,
    port: 4000,
    ipAddress: 's1.ss220.club',
    currentPlayers: 100,
    queuePosition: 0,
  },
  {
    name: 'Prime',
    maximumPlayers: 60,
    whitelisted: true,
    port: 4001,
    ipAddress: 's1.ss220.club',
    currentPlayers: 20,
    queuePosition: 0,
  },
  {
    name: 'TG',
    maximumPlayers: -1,
    whitelisted: true,
    port: 4002,
    ipAddress: 's1.ss220.club',
    currentPlayers: 220,
    queuePosition: 0,
  },
];

const mockServersStatus: ServerStatus[] = [
  {
    name: 'Green',
    currentPlayers: 100,
  },
  {
    name: 'Black',
    currentPlayers: 100,
  },
  {
    name: 'Prime',
    currentPlayers: 20,
  },
  {
    name: 'TG',
    currentPlayers: 220,
  },
];

const mockQueuePosition: QueuePosition = {
  serverName: 'Black',
  position: 5,
};

export function useServersService(production: boolean) {
  const [servers, setServers] = useState<Server[]>([]);
  const [serversStatus, setServersStatus] = useState<ServerStatus[]>([]);
  const [queuePosition, setQueuePosition] = useState<QueuePosition | null>(null);

  useEffect(() => {
    if (!production) {
      setServers(mockServers);
      setServersStatus(mockServersStatus);
      setQueuePosition(mockQueuePosition);
      return;
    }

    const token = sessionStorage.getItem('token');
    const fullUrl = `${import.meta.env.VITE_BACKEND_URL.replace(/\/$/, '')}/${import.meta.env.VITE_SERVERS_API.replace(/^\//, '')}`;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(fullUrl, {
        withCredentials: !!token,
        accessTokenFactory: () => token ?? '',
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    connection
      .start()
      .then(() => console.log('Connected to SignalR hub'))
      .catch((err) => {
        console.error('Error connecting to SignalR hub:', err);
      });

    connection.on('PendingServersInitData', (data: Server[]) => setServers(data));
    connection.on('PendingServersStatusData', (data: ServerStatus[]) => setServersStatus(data));
    connection.on('PendingQueuePosition', (data: QueuePosition) => setQueuePosition(data));

    return () => {
      connection.stop();
    };
  }, [production]);

  return {
    servers,
    serversStatus,
    queuePosition,
  };
}
