import * as React from 'react';
import { Provider } from 'react-redux';

import store from 'store/store';

import App from 'App/App';


import './style.scss';


const container = document.getElementById('root');
const root = createRoot(container);
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
