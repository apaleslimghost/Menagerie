import createStore from 'enviante';
import {read, write} from '@quarterto/enviante-localstorage';
import {createObserve} from 'enviante-react';
import initialMonsters from './monsters';

const connect = createStore({
	spells: read('spells', []),
	monsters: read('monsters', []),
	monsterList: read('monsterList', initialMonsters),
});

connect(write('spells', 'spells', []));
connect(write('monsters', 'monsters', []));
connect(write('monsterList', 'monsterList', initialMonsters));

export const observe = createObserve(connect);
export default connect;
