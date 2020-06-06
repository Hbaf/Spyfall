export type playerDO = {
	userName: string;
}

export type roomCreateDO = playerDO & {
	maxPlayers: number;
	password: string;
}

export type joinRoomDO = playerDO & {
	roomId: string,
}

export type roomDO = {
	roomId: string;
	isGM: boolean;
	players: playerDO[];
	maxPlayers: number;
	password: string;
}
