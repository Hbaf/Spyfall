export type player = {
	name: string;
}

export type roomCreate = {
	name: string;
	players: number;
	password: string;
}

export type roomState = { 
	readonly id?: string;
	readonly password?: string;
	readonly gameStarted: boolean;
	readonly userName: string;
	readonly isGM: boolean;
	readonly players: player[];
	readonly maxPlayers: number;
}
