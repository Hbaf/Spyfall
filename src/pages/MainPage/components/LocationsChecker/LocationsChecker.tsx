import * as React from 'react';
import { connect } from 'react-redux';
import { cn } from '@bem-react/classname';

import { locationGroup, baseLocation, edition } from 'store/types/app';
import { toggleLocation, toggleEdition } from 'store/actions/app';
import IState from 'store/types';
import { appEndpoint } from 'api';
import Input from 'components/Input/Input';

import './LocationsChecker.scss';


interface IStatePropsRedux {
	editions: edition[]
	groups: locationGroup[];
	locations: baseLocation[];
}

interface IDispatchPropsRedux {
	onLocationClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onLocationGroupClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface IOwnProps {
	className: string;
}

interface ILocationsCheckerProps extends IStatePropsRedux, IDispatchPropsRedux, IOwnProps {}


const cnLocationsChecker = cn('LocationsChecker');


const LocationsChecker: React.FC<ILocationsCheckerProps> = props => {
	const { className, editions, locations, onLocationClick, onLocationGroupClick } = props;

	return (
		<div className={cnLocationsChecker(null, [ className ])}>
			{
				editions.map((editionItem: edition, index: number) => {
					const { editionName, selected, locationIds } = editionItem;

					return locationIds.length ?
						(
							<div className={cnLocationsChecker('Group')} key={index} >
								<div className={cnLocationsChecker('GroupHeader')}>
									<Input
										className={cnLocationsChecker('GroupCheck')}
										type='checkbox'
										name={index.toString()}
										checked={selected}
										onChange={onLocationGroupClick}
									/>
									<span className={cnLocationsChecker('GroupPlaceholder')}>
										{ editionName }
									</span>
								</div>
								<div className={cnLocationsChecker('GroupBody')}>
									{
										locationIds.map((locationId: number) => {
											const { locName, selected: locSelected } = locations[locationId];

											return (
												<div className={cnLocationsChecker('Location')} key={locationId} >
													<Input
														className={cnLocationsChecker('LocationCheck')}
														type='checkbox'
														name={locationId.toString()}
														checked={locSelected}
														onChange={onLocationClick}
													/>
													<span className={cnLocationsChecker('LocationPlaceholder')}>
														{ locName }
													</span>
												</div>
											);
										})
									}
								</div>
							</div>
						) :
						null;
				})
			}
		</div>
	);
};

const mapStateToProps = (state: IState): IStatePropsRedux => state.app;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: any): IDispatchPropsRedux => ({
	onLocationClick: (event: React.ChangeEvent<HTMLInputElement>) => {
		const id = Number(event.target.name);
		appEndpoint.toggleLocation({ id });
		dispatch(toggleLocation(id));
	},
	onLocationGroupClick: (event: React.ChangeEvent<HTMLInputElement>) => {
		const id = Number(event.target.name);
		appEndpoint.toggleEdition({ id });
		dispatch(toggleEdition(id));
	},
});

export default connect<IStatePropsRedux, IDispatchPropsRedux, IOwnProps>(mapStateToProps, mapDispatchToProps)(LocationsChecker);
