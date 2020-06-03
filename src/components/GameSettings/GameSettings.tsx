import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { cn } from '@bem-react/classname';

import Input from 'components/Input/Input';

import { locationGroup, location } from 'store/types/settings';
import { toggleLocation, toggleGroupLocation} from 'store/actions/settings';

import './GameSettings.scss';
import IState from 'store/types';


const cnGameSettings = cn('GameSettings');


interface IStatePropsRedux {
	groups: locationGroup[];
	locations: location[];
}

interface IDispatchPropsRedux {
	onLocationClick: (e: any) => void;
	onLocationGroupClick: (e: any) => void;
}

interface IOwnProps {
	className: string;
}

interface IGameSettingsProps extends IStatePropsRedux, IDispatchPropsRedux, IOwnProps {}

const GameSettings: React.FC<IGameSettingsProps> = (props) =>
{
	const { className, groups, locations, onLocationClick, onLocationGroupClick } = props;

	return (
		<div className={ cnGameSettings(null, [ className ]) }>
			{ groups.map((locationsGroup: locationGroup, index: number) => {
				const { name, selected, locationsIds } = locationsGroup;
				return locationsIds.length ? (
					<Input 
						className={ cnGameSettings('SettingsGroup') }
						type = "checkbox"
						name = { '' + index }
						key = { index }
						checked = { selected }
						placeHolderText = { name }
						onchange = { onLocationGroupClick }
					>
						{locationsIds.map((locationId: number) => {
							const { name: locName, selected: locSelected } = locations[locationId];

							return (
								<Input
									className = { cnGameSettings('Setting') }
									type = "checkbox"
									name = { '' + locationId }
									key = { locationId }
									checked = { locSelected }
									placeHolderText = { locName }
									onchange = { onLocationClick }
								/>
							)
						})}
					</Input>)
				:null;
			})}
		</div>
	)
}

const mapStateToProps = (state :IState): IStatePropsRedux => {
	return state.settings;
}

const mapDispatchToProps = (dispatch: any): IDispatchPropsRedux => {
	return {
	  	onLocationClick: (e:any) => {
			dispatch(toggleLocation(+e.target.name));
		},
		onLocationGroupClick: (e:any) => {
			dispatch(toggleGroupLocation(+e.target.name));
		},
	}
}

export default connect<IStatePropsRedux,IDispatchPropsRedux,IOwnProps>(mapStateToProps, mapDispatchToProps)(GameSettings);