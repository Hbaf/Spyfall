import * as React from 'react';
import { cn } from '@bem-react/classname';

import './Tooltip.scss';

interface ITooltipProps {
	className?: string;
	mods?: Record<string, string | number | boolean>;
	text?: string[];
	type?: string;
}

const cnTooltip = cn('Tooltip');

const Tooltip: React.FC<ITooltipProps> = ({ className, mods, text, type, children }) => (
	<div className={cnTooltip({ type, ...mods }, [ className ])} >
		<div className={cnTooltip('Body')}>
			{
				text?.filter(item => item)
				.map(
					(item, index) => (
						<div className={cnTooltip('Hint')} key={index} >
							{item}
						</div>
					)
				)
			}
			{ children }
		</div>
	</div>
);

export default Tooltip;
