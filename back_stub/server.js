const gameConfig = require('./gameConfig');
const socketConfig = require('./socketConfig');
const actions = require('./socketActions');

const expressApp = require('express')();

const { Room } = require('./room');
const { User } = require('./user');


const editions = [];
const locations = [];
const groups = [];
let selectedLocsAmount = 0;

const spy = {
	roleName: 'Spy',
	stories: ['Your task is to find out what location you are in'],
	imgUrl: '',
}

// TODO add locationGroups init
for (let edition of gameConfig.editions.values()) {
	const editionId = editions.length;
	editions.push({
		editionName: edition.name,
		selected: edition.name === "Spyfall",
		locationIds: []
	})
	for (let location of edition.locations.values()) {
		if (location.name) {
			const locId = locations.length;
			if (edition.name === "Spyfall")
				selectedLocsAmount += 1;
			locations.push({
				editionId: editionId,
				locName: location.name,
				selected: edition.name === "Spyfall",
				// TODO add img support on back and url generation here
				imgUrl: '',
				roles: location.roles.map(
					(role) => (
						{ roleName: role.name, stories: [''], imgUrl: '' }
						)
					)
			})
			editions[editionId].locationIds.push(locId);
		}
	}
}


const socketServer = require('http').createServer(expressApp);
const socketPort = socketConfig.PORT || 42069;
socketServer.listen(socketPort, () => console.log(`Listening on port ${socketPort}`));
const io = require('socket.io')(socketServer);

io.on(actions.CONNECTION, function (socket) {
	console.log('New client - ' + socket.id);
	initApp(socket);
	socket.on(actions.CREATE_ROOM, createRoom);
	socket.on(actions.CONNECT_TO_ROOM, connectToRoom);
	socket.on(actions.LEAVE_ROOM, disconnect);
	socket.on(actions.DISCONNECT, disconnect);
	socket.on(actions.USER_READY, userReady);
	socket.on(actions.USER_NOT_READY, userNotReady);
	socket.on(actions.START_GAME, startGame);
	socket.on(actions.TOGGLE_LOCATION, toggleLocation);
	socket.on(actions.TOGGLE_ALL_LOCATIONS, toggleAllLocations);
	socket.on(actions.RESET_GAME, resetGame);
});

const rooms = new Map();
const usersToRoomsMap = new Map();

function initApp(socket) {
	const responseData = {
		userName: '',
		userId: socket.id,
		editions: editions,
		groups: groups,
		locations: locations.map((location) => ({
			editionId: location.editionId,
			locName: location.locName,
			selected: location.selected
		})),
		selectedLocationsAmount: selectedLocsAmount
	}
	socket.emit(actions.APP_INITED, responseData);
}

function disconnect(data) {
	const socket = this;

	console.log('Client disconnected - ' + socket.id);

	const roomId = usersToRoomsMap.get(socket.id);
	if (!roomId) return;

	const room = rooms.get(roomId);
	if (!room) return;

	const user = room.findUserById(socket.id);

	if (user) {
		room.removeUser(socket.id);
		if (room.isEmpty) {
			rooms.delete(room.id);
		} else {
			const userData = {
				userName: user.name,
				userId: user.id,
			}
			io.to(roomId).emit(actions.USER_CAME_OUT, userData);
			room.users[0].socket.emit(actions.NEW_GM);
		}
	}
}

function createRoom(data) {
	const socket = this;

	let roomId;
	do {
		roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
	} while (rooms.get(roomId))

	const user = new User(socket, data.userName);
	const room = new Room(roomId, user, data, locations, editions, groups);
	rooms.set(roomId, room);
	usersToRoomsMap.set(socket.id, roomId);
	
	const responseData = {
		roomId: roomId,
		isGM: true,
		players: room.users.map(user => (
			{
				userName: user.name,
				userId: user.id,
				ready: user.ready,
			})),
		maxPlayers: room.maxPlayers,
		password: room.password
	};
	socket.join(roomId);
	socket.emit(actions.ROOM_CREATED, responseData);
}

function connectToRoom(data) {
	const socket = this;

	const { roomId, userName } = data;
	const room = rooms.get(roomId);

	if (!room) {
		socket.emit(actions.ROOM_DOESNT_EXIST);
		return;
	}

	if (room.isFull) {
		socket.emit(actions.ROOM_IS_FULL);
		return;
	}

	const user = new User(socket, userName);
	room.addUser(user);
	usersToRoomsMap.set(socket.id, roomId);

	const userData = {
		userName,
		userId: user.id,
	}
	io.to(roomId).emit(actions.USER_JOINED, userData);

	const responseData = {
		roomId: roomId,
		isGM: false,
		players: room.users.map((user) => (
			{
				userName: user.name,
				userId: user.id,
				ready: user.ready
			})),
		maxPlayers: room.maxPlayers,
		password: room.password
	}
	socket.join(roomId);
	socket.emit(actions.ROOM_CONNECTED, responseData);
}

function startGame(data) {
	const socket = this;

	const roomId = usersToRoomsMap.get(socket.id);
	if (!roomId) return;

	const room = rooms.get(roomId);
	if(!room) return;

	const locId = getRandInt(data.locations.length);
	const rolesIds = Array(6).fill(-1);
	const spyId = getRandInt(room.users.length);

	for (let i = 0; i < room.users.length; i++) {
		if (i === spyId)
			continue;
		let id;
		do {
			id = getRandInt(locations[locId].roles.length);
		} while (rolesIds.indexOf(id) >= 0 )
		rolesIds[i] = id;
	}

	room.users.forEach((user, index) => {
		const location = locations[locId]
		const roleId = rolesIds[index];
		const role = roleId === -1 ? spy : location.roles[rolesIds[index]];
		const locName = roleId === -1 ? 'Unknown' : location.locName;

		const responseData = {
			location: locName,
			locationImgUrl: location.imgUrl,
			role: role.roleName,
			roleImgUrl: role.imgUrl,
			story: role.stories[getRandInt(role.stories.length)],
		}
		user.socket.emit(actions.GAME_STARTED, responseData)
	});
}

function resetGame() {
	const socket = this;
	const roomId = usersToRoomsMap.get(socket.id);
	if (!roomId) return;

	io.to(roomId).emit(actions.GAME_RESET);
}

function userReady(data) {
	const socket = this;
	const roomId = usersToRoomsMap.get(socket.id);
	if (!roomId) return;
	rooms.get(roomId).updateUser(socket.id, { ready: true });

	const userData = {
		userName: data.userName,
		userId: data.userId,
	}
	socket.broadcast.to(roomId).emit(actions.USER_READY, userData);
}

function userNotReady(data) {
	const socket = this;
	const roomId = usersToRoomsMap.get(socket.id);
	if (!roomId) return;
	rooms.get(roomId).updateUser(socket.id, { ready: false });

	const userData = {
		userName: data.userName,
		userId: data.userId,
	}
	socket.broadcast.to(roomId).emit(actions.USER_NOT_READY, userData);
}

function toggleLocation(data) {
	const socket = this;

	const roomId = usersToRoomsMap.get(socket.id);
	if (!roomId) return;

	rooms.get(roomId).toggleLocation(data.id);

	const locationData = {
		id: data.id,
	}
	socket.broadcast.to(roomId).emit(actions.TOGGLE_LOCATION, locationData);
}

function toggleAllLocations(data) {
	const socket = this;

	const roomId = usersToRoomsMap.get(socket.id);
	if (!roomId) return;

	rooms.get(roomId).toggleAllLocations(data.id);

	const locationData = {
		id: data.id,
	}
	socket.broadcast.to(roomId).emit(actions.TOGGLE_ALL_LOCATIONS, locationData);
}

function getRandInt(maxNum, minNum = 0) {
	return minNum + Math.floor(Math.random() * maxNum);
}
