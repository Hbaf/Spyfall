import * as React from 'react';
import { cn } from '@bem-react/classname';

import './Select.scss';

const cnSelect = cn('Select');

const Select = (props: {options: unknown[] }) => {
	const { options } = props;

	const [opened, toggle] = React.useState(false);
	const [selected, select] = React.useState(options[0]);

	const handleOpen = () => toggle(true);
	const handleClose = () => toggle(false);
	const handleSelect = (event: any) => {
		const selectedId = Number(event.target.value);
		select(options[selectedId]);
		handleClose();
	};

	return (
		<div className={cnSelect()}>
			<button className={cnSelect('Option', [ cnSelect('Input') ])} type='button'>
				<span className={cnSelect('OptionText')}>
					{selected}
				</span>
				<span className={cnSelect('Icon')} />
			</button>
			<div className={cnSelect('Options', { opened })}>
				{
					options.map((option, index) => (
						<button
							value={index}
							key={index}
							type='button'
							className={cnSelect('Option', [ cnSelect('Selectable') ])}
						>
							<span className={cnSelect('OptionText')}>
								{option}
							</span>
						</button>
					))
				}
			</div>
		</div>
	);
};

export default Select;
