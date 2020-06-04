export type gameData = {
	readonly location: string;
	readonly role: string;
	readonly story?: string;
	readonly locationImgUrl?: string | undefined;
	readonly roleImgUrl?: string | undefined;
}

export type startGameData = {
	locations: number[];
	timer: number;
}

export type gameState = gameData & {
	readonly gameStarted: boolean;
}