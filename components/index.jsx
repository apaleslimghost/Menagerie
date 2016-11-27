import React from 'react';
import connect from '../store';
import {createObserve} from 'enviante-react';
import {Typeahead} from 'react-typeahead';

import List from './list.jsx';
import spells from '../spells';

const observe = createObserve(connect);

const get = obj => key => obj[key];
const getKeys = (keys, obj) => keys.map(get(obj));
const values = obj => Object.keys(obj).map(get(obj));

const asSet = fn => (arr, ...args) => {
	const set = new Set(arr);
	fn(set, ...args);
	return Array.from(set);
};
const addUniq = asSet((a, x) => a.add(x));
const remove = asSet((a, x) => a.delete(x));

const ListContainer = observe(({spells}, {subscribe, dispatch}) =>
	<List
		spells={getKeys(subscribe('spells').sort(), spells)}
		remove={spell => dispatch('spells', spells => remove(spells, spell.id))}
	/>);

const SpellSelectorContainer = observe(({spells}, {dispatch}) =>
	<Typeahead
		options={values(spells)}
		filterOption='name'
		displayOption='name'
		maxVisible={10}
		onOptionSelected={spell => dispatch('spells', spells => addUniq(spells, spell.id))}
		showOptionsWhenEmpty={true}
	/>);

export default () => <div>
	<h1>Select spell</h1>
	<SpellSelectorContainer spells={spells} />
	<hr />
	<h1>Spells</h1>
	<ListContainer spells={spells} />
</div>
