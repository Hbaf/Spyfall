export type appDO = {
	userName: string;
	editions: editionDO[];
	groups: locationGroupDO[];
	locations: baseLocationDO[];
	selectedLocations: number;
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

export type locationGroupDO = {
	groupName: string;
	locationIds: number[];
}

export type editionDO = {
	editionName: string;
	selected: boolean;
	locationIds: number[];
}

