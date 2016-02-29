import {createStore, combineReducers} from 'redux';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';

import * as reducers from './reducers';

const store = createStore(
	combineReducers({
			...reducers,
		routing: routerReducer
	}),
	{},
	window.devToolsExtension ? window.devToolsExtension() : a => a
);

export const syncedHistory = syncHistoryWithStore(browserHistory, store);
export default store;
