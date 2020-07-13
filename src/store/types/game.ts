import { gameDO } from 'api/types/game';

export type gameState = gameDO & {
	gameStarted: boolean;
}
