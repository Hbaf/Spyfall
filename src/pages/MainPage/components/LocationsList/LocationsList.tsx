import * as React from 'react';
import { connect } from 'react-redux';
import { cn } from '@bem-react/classname';

import { baseLocation } from 'store/types/app';
import IState from 'store/types';

import './LocationsList.scss';


interface IStatePropsRedux {
	locations: baseLocation[];
}

interface IOwnProps {
	className: string;
}

interface ILocationsListProps extends IStatePropsRedux, IOwnProps {}


const cnLocationsList = cn('LocationsList');


const LocationsList: React.FC<ILocationsListProps> = props => {
	const { className, locations } = props;

	return (
		<div className={cnLocationsList(null, [ className ])}>
			{
				locations.filter(loc => loc.selected).map((location, index) => (
					<div className={cnLocationsList('Location')} key={index}>
						{location.locName}
					</div>))
			}
		</div>
	);
};

const mapStateToProps = (state: IState): IStatePropsRedux => state.app;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default connect<IStatePropsRedux, any, IOwnProps>(mapStateToProps)(LocationsList);
