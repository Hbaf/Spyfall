import { io } from 'socket.io-client';

import * as config from 'configs/api/config.json';
import store from 'store/store';

import GameEndpointClass from './game';
import RoomEndpointClass from './room';
import AppEndpointClass from './app';

const url = `${ config.PROTOCOL }://${ config.HOST }`;
const socket = io(url);

export const appEndpoint = new AppEndpointClass(socket, store);
export const gameEndpoint = new GameEndpointClass(socket, store);
export const roomEndpoint = new RoomEndpointClass(socket, store);
