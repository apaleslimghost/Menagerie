import createStore from 'enviante';
import {read, write} from '@quarterto/enviante-localstorage';
import {createObserve} from 'enviante-react';

const connect = createStore({
	spells: read('spells', []),
	monsters: read('monsters', [])
});

connect(write('spells', 'spells', []));
connect(write('monsters', 'monsters', []));

export const observe = createObserve(connect);
export default connect;