import { Button } from 'tgui-core/components';
import { classes } from 'tgui-core/react';
import type { PlayerData, Server } from '../common/interfaces';

type ServerCardProps = {
  server: Server;
  playerData: PlayerData;
};

export function ServerCard(props: ServerCardProps) {
  const { server, playerData } = props;
  const { name, ipAddress, port, currentPlayers, maximumPlayers, queuePosition, whitelisted } = server;
  // biome-ignore lint/correctness/noUnusedVariables: WiP
  const { ckey, role, donatorTier, banned, whitelistPasses } = playerData;

  return (
    <div className={classes(['ServerCard', whitelisted && 'ServerCard--whitelisted'])}>
      <div className="ServerCard__Title">{name}</div>
      <div className="ServerCard__Players">
        {currentPlayers}/{maximumPlayers}
      </div>
      <div className="ServerCard__Join">
        <Button onClick={() => window.open(`byond://${ipAddress}:${port}`)}>
          {queuePosition ? `В очереди (${queuePosition}й)` : 'Присоединиться'}
        </Button>
      </div>
    </div>
  );
}
