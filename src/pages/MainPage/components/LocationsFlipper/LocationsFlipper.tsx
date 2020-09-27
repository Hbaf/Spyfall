import * as React from 'react';
import { cn } from '@bem-react/classname';
import { connect } from 'react-redux';

import { baseLocation } from 'store/types/app';
import IState from 'store/types';

import LocationCard from '../LocationCard/LocationCard';

import './LocationsFlipper.scss';

interface IStatePropsRedux {
	locations: baseLocation[];
}

interface IOwnProps {
	className?: string;
}

interface ILocationsFlipperProps extends IStatePropsRedux, IOwnProps {}

const cnLocationsFlipper = cn('LocationsFlipper');

const LocationsFlipper: React.FC<ILocationsFlipperProps> = (props: ILocationsFlipperProps) => (
	<div className={cnLocationsFlipper()}>
		{ props.locations.filter(loc => loc.selected).map((loc, index) => <LocationCard title={loc.locName} key={index} />) }
	</div>
);

const mapStateToProps = (state: IState): IStatePropsRedux => state.app;

export default connect<IStatePropsRedux, unknown, IOwnProps>(mapStateToProps)(LocationsFlipper);
