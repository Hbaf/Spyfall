export type locationGroup = {
	name: string;
	selected: boolean;
	locationsIds: number[];
}

export type role = {
	name: string;
	story?: string;
	imgUrl?: string;
}

export type location = {
	group: number;
	name: string;
	selected: boolean;
	imgUrl?: string;
	//TODO make roles required
	roles?: role[];
}

export type settingsState = {
	groups: locationGroup[];
	locations: location[];
}