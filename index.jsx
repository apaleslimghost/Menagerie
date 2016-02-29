import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import store from './store';

const rootEl = document.querySelector('main');

let render = () => {
	console.log('rendering');
	const App = require('./components/index.jsx');
	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
		rootEl
	);
};

if(module.hot) {
	// Support hot reloading of components
	// and display an overlay for runtime errors
	const renderApp = render;
	const renderError = (error) => {
		const RedBox = require('redbox-react');
		ReactDOM.render(
			<RedBox error={error} />,
			rootEl
		);
	};
	render = () => {
		try {
			renderApp();
		} catch (error) {
			renderError(error);
		}
	};
	module.hot.accept('./components/index.jsx', () => {
		setTimeout(render);
	});
}

render();
