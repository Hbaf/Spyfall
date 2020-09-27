import * as React from 'react';
import { cn } from '@bem-react/classname';

import JoinRoom from 'pages/JoinRoomPage/components/JoinRoom/JoinRoom';

import './JoinRoomPage.scss';

const cnJoinRoomPage = cn('JoinRoomPage');

const JoinRoomPage: React.FC = () => (
	<div className={cnJoinRoomPage()}>
		<JoinRoom />
	</div>
);

export default JoinRoomPage;
