import * as React from 'react';
import { cn } from '@bem-react/classname';

import './LocationCard.scss';

interface IOwnProps {
	title: string;
	icon?: string;
}

const cnLocationCard = cn('LocationCard');
const flippedIconUrl = '';

const LocationCard: React.FC<IOwnProps> = ({ icon, title }) => {
	const [flipped, flipp] = React.useState(false);

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
		<div className={cnLocationCard()} onClick={() => flipp(!flipped)}>
			{
				flipped ?
					<div className={cnLocationCard('FlippedIcon')} style={{ backgroundImage: `url(${ flippedIconUrl })` }} /> :
					<>
						{ icon ? <div className={cnLocationCard('Icon')} style={{ backgroundImage: `url(${ icon })` }} /> : null }
						<div className={cnLocationCard('Title')}>
							{ title }
						</div>
					</>
			}
		</div>
	);
};

export default LocationCard;
