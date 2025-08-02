import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from 'store/store';
import App from 'App/App';

import './style.scss';

const container = document.getElementById('root');
if (!container) {
	console.error('Failed to find the root element');
	// kill the process
	process.exit(1);
}

const root = createRoot(container);

root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
