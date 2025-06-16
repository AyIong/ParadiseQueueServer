import { Button } from 'tgui-core/components';
import { classes } from 'tgui-core/react';
import type { Server } from '../common/interfaces';

export function ServerCard(props: Server) {
  const { name, currentPlayers, maximumPlayers, queuePosition, whitelisted, ipAddress, port } = props;

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
