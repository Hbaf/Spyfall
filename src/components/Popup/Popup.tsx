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
				<div className={cnPopup('Paranja')} onClick={this.handleClose} onKeyPress={this.handleClose} role='alertdialog'>
					{ /* eslint-disable-next-line jsx-a11y/click-events-have-key-events */ }
					<div className={cnPopup('Body')} onClick={this.handleClickPreventer} role='alertdialog'>
						{children}
					</div>
				</div>
			</div>
		);
	}
}

export default Popup;
