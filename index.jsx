import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';

import * as reducers from './reducers';

import SpellPage from './components/spellpage.jsx';
import List from './components/list.jsx';
import FilteredSpells from './components/filtered-spells.jsx';

import spells from './spells';

const store = createStore(
	combineReducers({
		...reducers,
		routing: routerReducer
	}),
	{},
	window.devToolsExtension ? window.devToolsExtension() : a => a
);

const syncedHistory = syncHistoryWithStore(browserHistory, store);

const withProps = (Component, moreProps) => props => <Component {...moreProps} {...props} />;

ReactDOM.render(
	<Provider store={store}>
		<Router history={syncedHistory}>
			<Route path="/" component={FilteredSpells} />
			<Route path="/all-spells" component={withProps(List, {spells})}/>
			<Route path="/spell/:spellid" component={withProps(SpellPage, {spells})}/>
		</Router>
	</Provider>,
	document.querySelector('main')
);
