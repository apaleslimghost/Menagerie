import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {syncHistory, routeReducer} from 'react-router-redux';

import * as reducers from './reducers';

import SpellCard from './components/spellcard.jsx';
import List from './components/list.jsx';

import spells from './spells';

const reducer = combineReducers({
	...reducers,
	routing: routeReducer
});

const reduxRouterMiddleware = syncHistory(browserHistory);
const store = createStore(
	reducer,
	{},
	applyMiddleware(reduxRouterMiddleware)
);

const withProps = (Component, moreProps) => props => <Component {...moreProps} {...props} />;

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/all-spells" component={withProps(List, {spells})}/>
			<Route path="/spell/:spellid" component={props => <SpellCard spell={spells[props.params.spellid]}/>}/>
		</Router>
	</Provider>,
	document.querySelector('main')
);
