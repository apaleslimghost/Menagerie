import createStore from 'enviante';
import {read, write} from '@quarterto/enviante-localstorage';

const connect = createStore({
	spells: read('spells', [])
});

connect(write('spells', 'spells', []));

export default connect;