export type player = {
	name: string;
}

export type room = { 
	id?: string;
	gameStarted: boolean;
	isGM: boolean;
	players: player[];
}

export type gameState = {
	room: room;
}
