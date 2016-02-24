import {handleActions} from 'redux-actions';
import {SET_FILTER} from '../actions/set-filter';

export default handleActions({
	[SET_FILTER]: (state, action) => action.payload
}, "");
