import * as React from 'react';

import { cn } from '@bem-react/classname';

import './CreateRoomPage.scss';
import CreateRoom from 'components/CreateRoom/CreateRoom';

const cnCreateRoomPage = cn('CreateRoomPage');

class CreateRoomPage extends React.Component {
	render() {
		return (
			<div className={cnCreateRoomPage()}>
				<CreateRoom />
			</div>
		)
	}
}

export default CreateRoomPage;
