import * as signalR from '@microsoft/signalr';
import { useEffect, useRef, useState } from 'react';
import type { QueuePosition, Server, ServerStatus } from './common/interfaces';

export function useMockServersService() {
  const [servers, setServers] = useState<Server[]>([]);

  useEffect(() => {
    // Можно заменить на реальное подключение к SignalR
    const mockServers: Server[] = [
      {
        name: 'Green',
        maximumPlayers: -1,
        whitelisted: false,
        port: 4002,
        ipAddress: 's1.ss220.club',
        currentPlayers: 20,
        queuePosition: 20,
      },
      {
        name: 'Black',
        maximumPlayers: 100,
        whitelisted: false,
        port: 4000,
        ipAddress: 's1.ss220.club',
        currentPlayers: 100,
        queuePosition: 20,
      },
      {
        name: 'Prime',
        maximumPlayers: -1,
        whitelisted: true,
        port: 4001,
        ipAddress: 's1.ss220.club',
        currentPlayers: 20,
        queuePosition: 20,
      },
      {
        name: 'TG',
        maximumPlayers: -1,
        whitelisted: true,
        port: 4002,
        ipAddress: 's1.ss220.club',
        currentPlayers: 20,
        queuePosition: 20,
      },
    ];

    setServers(mockServers);
  }, []);

  return { servers };
}

export function useServersService(serversApi: string, token: string | null) {
  const [servers, setServers] = useState<Server[]>([]);
  const [serversStatus, setServersStatus] = useState<ServerStatus[]>([]);
  const [queuePosition, setQueuePosition] = useState<QueuePosition | null>(null);
  const connectionRef = useRef<signalR.HubConnection | null>(null);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(serversApi, {
        withCredentials: !!token,
        accessTokenFactory: () => token ?? '',
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => console.log('Connected to SignalR hub'))
      .catch((err) => console.error('Error connecting to SignalR hub:', err));

    connection.on('PendingServersInitData', (servers: Server[]) => setServers(servers));
    connection.on('PendingServersStatusData', (status: ServerStatus[]) => setServersStatus(status));
    connection.on('PendingQueuePosition', (position: QueuePosition) => setQueuePosition(position));

    connectionRef.current = connection;

    return () => {
      connection.stop();
    };
  }, [serversApi, token]);

  return { servers, serversStatus, queuePosition };
}
