module.exports.User = class {
	constructor(socket, name) {
		this._socket = socket;
		this._id = socket.id;
		this._name = name;
		this._ready = false;
	}

	update(patch) {
		this._id = patch.id || this._id;
		this._name = patch.name || this._name;
		this._ready = patch.ready || (typeof patch.ready === 'undefined' && this._ready);

		return this;
	}

	get socket() {
		return this._socket;
	}

	get id() {
		return this._id;
	}

	get name() {
		return this._name;
	}

	get ready() {
		return this._ready;
	}
};
