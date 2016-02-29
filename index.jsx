import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import hotRender from '@quarterto/hot-render';

import store from './store';

const rootEl = document.querySelector('main');

hotRender(() => {
	const App = require('./components/index.jsx');
	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
		rootEl
	);
}, './components/index.jsx', rootEl)();
