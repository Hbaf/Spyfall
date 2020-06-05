import * as React from 'react';
import { connect } from 'react-redux';

import { cn } from '@bem-react/classname';

import { locationGroup, baseLocation } from 'store/types/settings';
import { toggleLocation, toggleGroupLocation} from 'store/actions/settings';
import IState from 'store/types';

import './ControlPanel.scss';


interface IStatePropsRedux {
	readonly groups: locationGroup[];
	readonly locations: baseLocation[];
}

interface IDispatchPropsRedux {
	readonly onLocationClick: (e: any) => void;
	readonly onLocationGroupClick: (e: any) => void;
}

interface IOwnProps {
	readonly className: string;
}

interface IControlPanelProps extends IStatePropsRedux, IDispatchPropsRedux, IOwnProps {}


const cnControlPanel = cn('ControlPanel');


const ControlPanel: React.FC<IControlPanelProps> = (props) =>
{
	const { className, groups, locations, onLocationClick, onLocationGroupClick } = props;

	return (
		<div className={ cnControlPanel(null, [ className ]) }>
			{ groups.map((locationsGroup: locationGroup, index: number) => {
				const { name, selected, locationsIds } = locationsGroup;
				return locationsIds.length ? (
					<div className={ cnControlPanel('Group') } key = { index } >
						<div className={ cnControlPanel('GroupHeader')}>
							<input
								className={ cnControlPanel('GroupCheck') }
								type = "checkbox"
								name = { index.toString() }
								checked = { selected }
								onChange = { onLocationGroupClick }
							/>
							<span className={cnControlPanel("GroupPlaceholder")}>{ name }</span>
						</div>
						<div className={ cnControlPanel('GroupBody') }>
							{locationsIds.map((locationId: number) => {
								const { name: locName, selected: locSelected } = locations[locationId];

								return (
									<div className={ cnControlPanel('Location') } key = { locationId } >
										<input
											className = { cnControlPanel('LocationCheck') }
											type = "checkbox"
											name = { locationId.toString() }
											checked = { locSelected }
											onChange = { onLocationClick }
										/>
										<span className={cnControlPanel("LocationPlaceholder")}>{ locName }</span>
									</div>
								)
							})}
						</div>
					</div>)
				:null;
			})}
		</div>
	)
}

const mapStateToProps = (state: IState): IStatePropsRedux => {
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

export default connect<IStatePropsRedux,IDispatchPropsRedux,IOwnProps>(mapStateToProps, mapDispatchToProps)(ControlPanel);