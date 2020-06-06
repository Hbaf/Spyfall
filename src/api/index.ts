import * as io from 'socket.io-client';

import * as config from "configs/api/config.json";
import store from "store/store";

import gameEndpointClass from './game';
import roomEndpointClass from './room';
import AppEndpointClass from './app';

const url = `${config.PROTOCOL}://${config.HOST}:${config.PORT}`;
const socket = io(url);

export const appEndpoint = new AppEndpointClass(socket, store);
export const gameEndpoint = new gameEndpointClass(socket, store);
export const roomEndpoint = new roomEndpointClass(socket, store);
