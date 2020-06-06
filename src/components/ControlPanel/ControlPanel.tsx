import * as React from 'react';
import { connect } from 'react-redux';

import { cn } from '@bem-react/classname';

import { locationGroup, baseLocation, edition } from 'store/types/app';
import { toggleLocation, toggleEdition} from 'store/actions/app';
import IState from 'store/types';
import { appEndpoint } from 'api';

import './ControlPanel.scss';

import Input from 'components/Input/Input';


interface IStatePropsRedux {
	editions: edition[]
	groups: locationGroup[];
	locations: baseLocation[];
}

interface IDispatchPropsRedux {
	onLocationClick: (e: any) => void;
	onLocationGroupClick: (e: any) => void;
}

interface IOwnProps {
	className: string;
}

interface IControlPanelProps extends IStatePropsRedux, IDispatchPropsRedux, IOwnProps {}


const cnControlPanel = cn('ControlPanel');


const ControlPanel: React.FC<IControlPanelProps> = (props) =>
{
	const { className, editions, groups, locations, onLocationClick, onLocationGroupClick } = props;

	return (
		<div className={ cnControlPanel(null, [ className ]) }>
			{ editions.map((edition: edition, index: number) => {
				const { editionName, selected, locationIds } = edition;
				return locationIds.length ? (
					<div className={ cnControlPanel('Group') } key = { index } >
						<div className={ cnControlPanel('GroupHeader')}>
							<Input
								className={ cnControlPanel('GroupCheck') }
								type = "checkbox"
								name = { index.toString() }
								checked = { selected }
								onChange = { onLocationGroupClick }
							/>
							<span className={cnControlPanel("GroupPlaceholder")}>{ editionName }</span>
						</div>
						<div className={ cnControlPanel('GroupBody') }>
							{locationIds.map((locationId: number) => {
								const { locName: locName, selected: locSelected } = locations[locationId];

								return (
									<div className={ cnControlPanel('Location') } key = { locationId } >
										<Input
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
	return state.app;
}

const mapDispatchToProps = (dispatch: any): IDispatchPropsRedux => {
	return {
	  	onLocationClick: (e:any) => {
			const id = +e.target.name;
			appEndpoint.toggleLocation({id});
			dispatch(toggleLocation(id));
		},
		onLocationGroupClick: (e:any) => {
			const id = +e.target.name;
			appEndpoint.toggleEdition({id});
			dispatch(toggleEdition(id));
		},
	}
}

export default connect<IStatePropsRedux,IDispatchPropsRedux,IOwnProps>(mapStateToProps, mapDispatchToProps)(ControlPanel);