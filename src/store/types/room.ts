import { playerBaseDO, playerDO } from "api/types/room";

export type player = playerBaseDO & playerDO & {
	ready: boolean;
}

export type roomState = {
	roomId: string;
    isGM: boolean;
    players: player[];
    maxPlayers: number;
    password: string;
};
