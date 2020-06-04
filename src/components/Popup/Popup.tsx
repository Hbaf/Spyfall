import * as React from 'react';

import { cn } from '@bem-react/classname';

import './Popup.scss';

const cnPopup = cn('Popup');

class Popup extends React.Component {
	
	popupClose() {
		console.log('Click');
	}

	clickPreventer(e: any) {
		e.stopPropagation();
	}

	render() {
		return (
			<div className={cnPopup()}>
				<div className={cnPopup('Paranja')} onClick={this.popupClose}>
					<div className={cnPopup('Body')} onClick={this.clickPreventer}>
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
}

export default Popup;
