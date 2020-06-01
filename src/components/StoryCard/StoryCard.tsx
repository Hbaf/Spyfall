import * as React from 'react';
import { cn } from '@bem-react/classname';
import './StoryCard.scss';


export interface IStoryCardProps {
	location: string;
	imageUrl: boolean;
	role: string;
	story: string;
}

const cnStoryCard = cn('StoryCard')
const StoryCard: React.FC<IStoryCardProps> = ({ location, imageUrl, role, story }) => {
	return (
		<div className={cnStoryCard()}>
			<div className={cnStoryCard('Header', { 'Image' : Boolean(imageUrl) })}>
				{ imageUrl ? <div className={cnStoryCard('Image')} /> : null }
				<div className={cnStoryCard('Location')}>{ location }</div>
			</div>
			<div className={cnStoryCard('Role')}>{ role }</div>
			<div className={cnStoryCard('Story')}>{ story }</div>
		</div>
	);
};