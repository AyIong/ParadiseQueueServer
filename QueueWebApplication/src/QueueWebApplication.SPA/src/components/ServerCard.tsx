import { type ReactNode, useEffect, useState } from 'react';
import { Button, Divider, Section, Stack } from 'tgui-core/components';
import { classes } from 'tgui-core/react';
import { QueueResponse, QueueState } from '../common/enums';
import type { PlayerData, Server } from '../common/interfaces';

interface ServerCardProps {
  server: Server;
  playerData: PlayerData;
}

export function ServerCard({ server, playerData }: ServerCardProps) {
  const [queueState, setQueueState] = useState(QueueState.NotInQueue);
  const queuePosition = server.queuePosition;

  const banned = playerData.banned;
  const notWhitelisted = server.whitelisted && !playerData.whitelistPasses?.includes(server.port);
  const disabled = banned || notWhitelisted;

  useEffect(() => {
    if (server.maximumPlayers === -1) {
      setQueueState(QueueState.AllowedToConnect);
    }

    if (queuePosition === 0 && server.currentPlayers < server.maximumPlayers) {
      setQueueState(QueueState.AllowedToConnect);
    }
  }, [queuePosition, server.currentPlayers, server.maximumPlayers]);

  const serverUrl = `byond://${server.ipAddress}:${server.port}`;
  async function connectToQueue() {
    const response = await fetch(`/queue/add-client?serverName=${server.name}`, {
      method: 'POST',
    }).then((r) => r.json());

    switch (response) {
      case QueueResponse.AddedToQueue:
        setQueueState(QueueState.InQueue);
        break;
      case QueueResponse.BypassedQueue:
        setQueueState(QueueState.AllowedToConnect);
        playHornSound();
        break;
      case QueueResponse.Rejected:
        throw new Error("You shouldn't be able to press connect button");
    }
  }

  function playHornSound() {
    const sound = new Audio('/sounds/adminhelp.ogg');
    sound.load();
    sound.volume = 0.15;
    sound.play().catch(() => {});
  }

  function getTooltipText() {
    if (banned) {
      return 'Вы не можете играть, так как у вас бан!';
    } else if (notWhitelisted) {
      return 'У вас отсутствует вайтлист на этот сервер!';
    }
  }

  function getColor() {
    if (disabled) {
      return 'bad';
    }

    switch (queueState) {
      case QueueState.AllowedToConnect:
        return 'good';
      case QueueState.Banned:
        return 'bad';
      case QueueState.InQueue:
        return 'warning';
    }
  }

  function getText() {
    switch (queueState) {
      case QueueState.AllowedToConnect:
        return 'Присоединиться';
      case QueueState.Banned:
        return 'Забанен';
      case QueueState.NotInQueue:
        return 'Встать в очередь';
      case QueueState.InQueue:
        return `В очереди (${queuePosition}й)`;
    }
  }

  return (
    <Section
      fill
      title={server.name}
      className={classes(['ServerCard', server.whitelisted && 'ServerCard--whitelisted'])}
    >
      <Stack.Item className="ServerCard__Content">
        <ServerInfo title="Онлайн">
          {server.currentPlayers}/{server.maximumPlayers}
        </ServerInfo>
        <Divider />
        <ServerInfo title="Очередь">{server.queuePosition === 0 ? 'Отсутствует' : server.queuePosition}</ServerInfo>
      </Stack.Item>
      <Stack.Item className="ServerCard__Join">
        <Button
          fluid
          tooltip={getTooltipText()}
          color={getColor()}
          disabled={disabled}
          onClick={() =>
            queueState === QueueState.NotInQueue
              ? connectToQueue
              : queueState === QueueState.AllowedToConnect && window.open(serverUrl)
          }
        >
          {getText()}
        </Button>
      </Stack.Item>
    </Section>
  );
}

type ServerInfoProps = {
  title: string;
  children: ReactNode;
};

function ServerInfo(props: ServerInfoProps) {
  const { title, children } = props;
  return (
    <div className="ServerCard__Info">
      <div className="ServerCard__Info--name">{title}</div>
      <div className="ServerCard__Info--content">{children}</div>
    </div>
  );
}
