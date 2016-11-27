import React from 'react';
import connect from '../store';
import {createObserve} from 'enviante-react';
import {Tokenizer} from 'react-typeahead';

import List from './list.jsx';
import spells from '../spells';

const observe = createObserve(connect);

const get = obj => key => obj[key];
const getKeys = (keys, obj) => keys.map(get(obj));
const values = obj => Object.keys(obj).map(get(obj));
const notKeys = (keys, obj) => Object.keys(obj)
.filter(key => !keys.includes(key))
.map(get(obj));

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
	/>);

const SpellSelectorContainer = observe(({spells}, {subscribe, dispatch}) => {
	let tokenizer;
	return <Tokenizer
		options={notKeys(subscribe('spells'), spells)}
		defaultSelected={getKeys(subscribe('spells').sort(), spells)}
		filterOption='name'
		displayOption='name'
		maxVisible={10}
		ref={el => tokenizer = el}
		onTokenAdd={spell => {
			// workaround fmoo/react-typeahead#224
			tokenizer.refs.typeahead.refs.entry.blur();
			tokenizer.refs.typeahead.refs.entry.focus();
			dispatch('spells', spells => addUniq(spells, spell.id));
		}}
		onTokenRemove={spell => {
			tokenizer.refs.typeahead.refs.entry.focus();
			dispatch('spells', spells => remove(spells, spell.id))
		}}
	/>;
});

export default () => <div>
	<h1>Select spell</h1>
	<SpellSelectorContainer spells={spells} />
	<hr />
	<h1>Spells</h1>
	<ListContainer spells={spells} />
</div>
