import * as React from 'react';
import { cn } from '@bem-react/classname';
import './StoryCard.scss';
import { connect } from 'react-redux';
import IState from 'store/types';
import { gameState } from 'store/types/game';


interface IStatePropsRedux extends gameState {}

interface IOwnProps {
	readonly className: string;
}

interface IStoryCardProps extends IStatePropsRedux, IOwnProps {}


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

const mapStateToProps = (state: IState): IStatePropsRedux => {
	return state.game;
}

export default connect(mapStateToProps)(StoryCard);
