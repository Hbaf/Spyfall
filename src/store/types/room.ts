export type player = {
	name: string;
	ready?: boolean;
}

export type roomCreateData = {
	name: string;
	maxPlayers: number;
	password: string;
}

export type roomJoinData = {
	id: string;
	players?: player[];
	maxPlayers?: number;
	password?: string;
	isGM?: boolean;
}

export type roomState = { 
	readonly userName: string;
	readonly isGM: boolean;
	readonly players: player[];
	readonly maxPlayers: number;
	readonly id?: string;
	readonly password?: string;
}
