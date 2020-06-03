import * as React from 'react';
import { cn } from '@bem-react/classname';
import './StoryCard.scss';


export interface IStoryCardProps {
	className: string;
	location?: string;
	locationImgUrl?: string;
	role?: string;
	roleImgUrl?: string;
	story?: string;
}

const cnStoryCard = cn('StoryCard')
const StoryCard: React.FC<IStoryCardProps> = ({ className, location, locationImgUrl, role, roleImgUrl, story }) => {
	return (
		<div className={cnStoryCard(null, [ className ])}>
			<div className={cnStoryCard('Header', { 'Image' : Boolean(locationImgUrl) })}>
				<div className={cnStoryCard('HeaderThumb')}>
					{ locationImgUrl ? <div className={cnStoryCard('Location-Image')} style={{ backgroundImage: "url('" + locationImgUrl + "')" }}/> : null }
					{ roleImgUrl ? <div className={cnStoryCard('Role-Image')} style={{ backgroundImage: ("url('" + roleImgUrl + "')") }} /> : null }
				</div>
				<div className={cnStoryCard('HeaderTitle')}>
					<div className={cnStoryCard('Location')}>{ location }</div>
					<div className={cnStoryCard('Role')}>{'You are ' + role }</div>
				</div>
			</div>
			<div className={cnStoryCard('Story')}>{ story }</div>
		</div>
	);
};

export default StoryCard;
