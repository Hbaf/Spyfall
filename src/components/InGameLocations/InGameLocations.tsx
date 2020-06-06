import * as React from 'react';
import { connect } from 'react-redux';

import { cn } from '@bem-react/classname';

import { baseLocation } from 'store/types/app';
import IState from 'store/types';

import './InGameLocations.scss';


interface IStatePropsRedux {
	locations: baseLocation[];
}

interface IOwnProps {
	className: string;
}

interface IInGameLocationsProps extends IStatePropsRedux, IOwnProps {}


const cnInGameLocations = cn('InGameLocations');


const InGameLocations: React.FC<IInGameLocationsProps> = (props) =>
{
	const { className, locations } = props;
	return (
		<div className={ cnInGameLocations(null, [ className ]) }>
			{locations.map((location, index) => location.selected ?
				<div className={cnInGameLocations('Location')} key={index}> {location.locName} </div> :
				null
			)}
		</div>
	)
}

const mapStateToProps = (state: IState): IStatePropsRedux => {
	return state.app;
}

export default connect<IStatePropsRedux,{},IOwnProps>(mapStateToProps)(InGameLocations);