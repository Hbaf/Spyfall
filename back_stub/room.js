module.exports.Room = class {
	constructor(id, user, data, locations, editions, groups) {
		this._id = id;
		this._users = [ user ];
		this._GM = user.name,
		this._maxPlayers = data.maxPlayers,
		this._password = data.password,
		this._isFull = false;
		this._isEmpty = true;
		this._locations = locations;
		this._editions = editions;
		this._groups = groups;
	}

	addUser(user) {
		this._users.push(user);
		this._isEmpty = false;
		if (this._users.length === this._maxPlayers) {
			this._isFull = true;
		}
	}

	removeUser(id) {
		this._users = this._users.filter(user => user.id !== id);
		this._isFull = false;
		if (!this._users.length) {
			this._isEmpty = true;
		}
	}

	updateUser(id, patch) {
		this._users = this._users.map(user => user.id === id ? user.update(patch) : user);
	}

	findUserById(id) {
		for (const user of this._users.values()) {
			if (user.id === id) {
				return user;
			}
		}

		return null;
	}

	toggleLocation(id) {
		this._locations[id].selected = !this._locations[id].selected;
	}

	toggleAllLocations(id) {
		for (const locId of this._editions[id].locationIds.values()) {
			this.toggleLocation(locId);
		}
	}

	get isFull() {
		return this._isFull;
	}

	get isEmpty() {
		return this._isEmpty;
	}

	get users() {
		return this._users;
	}

	get id() {
		return this._id;
	}

	get GM() {
		return this._GM;
	}

	get maxPlayers() {
		return this._maxPlayers;
	}

	get password() {
		return this._password;
	}
};
