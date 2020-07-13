import * as React from 'react';

import { cn } from '@bem-react/classname';

import './Popup.scss';

const cnPopup = cn('Popup');

class Popup extends React.Component {
	handleClose(): void {
		return null;
	}

	handleClickPreventer(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
		event.stopPropagation();
	}

	render() {
		const { children } = this.props;

		return (
			<div className={cnPopup()}>
				<div className={cnPopup('Paranja')} onClick={this.handleClose}>
					<div className={cnPopup('Body')} onClick={this.handleClickPreventer}>
						{children}
					</div>
				</div>
			</div>
		);
	}
}

export default Popup;
