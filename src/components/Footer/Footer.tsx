import * as React from 'react';

import { cn } from '@bem-react/classname';

import './Footer.scss';

const cnFooter = cn('Footer');

const Footer: React.FC = () => {
	return (
		<div className={cnFooter()}>
			<a href="https://hwint.ru/portfolio-item/spyfall?utm_source" target="_blank">Spyfall</a> designed by Alexandr Ushan, published by <a href="https://hwint.ru/" target="_blank">Hobby World</a>
		</div>
	);
}

export default Footer;