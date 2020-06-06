export type playerBaseDO = {
	userName: string;
}

export type playerDO = playerBaseDO & {
	userId: string;
}

export type roomCreateDO = playerBaseDO & {
	maxPlayers: number;
	password: string;
}

export type joinRoomDO = playerBaseDO & {
	roomId: string,
	password: string;
}

export type roomDO = {
	roomId: string;
	isGM: boolean;
	players: playerDO[];
	maxPlayers: number;
	password: string;
}
