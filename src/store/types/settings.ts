export type locationGroup = {
	name: string;
	selected: boolean;
	locationsIds: number[];
}

export type role = {
	name: string;
	story: string;
	imgUrl: string;
}
export type baseLocation = {
	group: number;
	name: string;
	selected: boolean;
}

export type location = baseLocation & {
	imgUrl: string;
	roles: role[];
}

export type settingsState = {
	groups: locationGroup[];
	locations: baseLocation[];
	selectedLocations: number;
}