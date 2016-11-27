import React from 'react';
import ReactDOM from 'react-dom';
import hotRender from '@quarterto/hot-render';

const rootEl = document.querySelector('main');

hotRender(() => {
	const App = require('./components/index.jsx');
	ReactDOM.render(<App />, rootEl);
}, './components/index.jsx', rootEl)();
