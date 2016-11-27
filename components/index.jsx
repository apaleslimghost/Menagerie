import React from 'react';
import connect from '../store';
import {createObserve} from 'enviante-react';

import List from './list.jsx';
import spells from '../spells';

const observe = createObserve(connect);

const get = obj => key => obj[key];
const getKeys = (keys, obj) => keys.map(get(obj));

const ListContainer = observe(({spells}, {subscribe}) =>
	<List spells={getKeys(subscribe('spells'), spells)} />
);

const SpellSelectorContainer = observe(({spells}, {subscribe, dispatch}) => {
	const spellList = subscribe('spells');
	return <List
		spells={spells}
		isSelected={spell => spellList.includes(spell.id)}
		select={spell => dispatch('spells', spellList => {
			const set = new Set(spellList);
			if(set.has(spell.id)) {
				set.delete(spell.id);
			} else {
				set.add(spell.id);
			}
			return Array.from(set);
		})} />
});

export default () => <div>
	<h1>Selected spells</h1>
	<ListContainer spells={spells} />
	<hr />
	<h1>All spells</h1>
	<SpellSelectorContainer spells={spells} />
</div>
