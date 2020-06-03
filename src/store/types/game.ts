export type player = {
	name: string;
}

export type roomCreate = {
	name: string;
	players: number;
	password: string;
}

export type room = { 
	id?: string;
	gameStarted: boolean;
	isGM: boolean;
	players: player[];
}

export type gameState = {
	readonly room: room;
}
