import * as React from 'react';
import { cn } from '@bem-react/classname';

import './CreateRoomPage.scss';
import CreateRoom from 'pages/CreateRoomPage/components/CreateRoom/CreateRoom';

const cnCreateRoomPage = cn('CreateRoomPage');

const CreateRoomPage: React.FC = () => (
	<div className={cnCreateRoomPage()}>
		<CreateRoom />
	</div>
);

export default CreateRoomPage;
