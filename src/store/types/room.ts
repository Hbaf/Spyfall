import { playerBaseDO, playerDO } from 'api/types/room';

export type player = playerBaseDO & playerDO & {
	ready: boolean;
}

export type roomBase = {
	roomId: string;
}

export type roomState = roomBase & {
    isGM: boolean;
    players: player[];
    maxPlayers: number;
    password: string;
};
