import { playerBaseDO, playerDO } from "./room";

export type appDO = playerBaseDO & playerDO &{
	editions: editionDO[];
	groups: locationGroupDO[];
	locations: baseLocationDO[];
	selectedLocationsAmount: number;
}

export type roleDO = {
	roleName: string;
	imgUrl: string;
	story: string;
}

export type baseLocationDO = {
	locName: string;
	selected: boolean;
	editionId: number;
	groupId?: number;
}

export type locationDO = baseLocationDO & {
	role: roleDO;
	imgUrl: string;
}

export type locationToggleDO = {
	id: number;
}

export type editionToggleDO = {
	id: number
}

export type locationGroupDO = {
	groupName: string;
	locationIds: number[];
}

export type editionDO = {
	editionName: string;
	selected: boolean;
	locationIds: number[];
}

