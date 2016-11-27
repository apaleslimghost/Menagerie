import createStore from 'enviante';
import {read, write} from '@quarterto/enviante-localstorage';
import {createObserve} from 'enviante-react';

const connect = createStore({
	spells: read('spells', [])
});

connect(write('spells', 'spells', []));

export const observe = createObserve(connect);
export default connect;