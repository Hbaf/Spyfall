export type startGameDO = {
	locations: number[];
	timer?: number;
}

export type gameDO = {
	location: string;
	role: string;
	story: string;
	locationImgUrl: string;
	roleImgUrl: string;
}
