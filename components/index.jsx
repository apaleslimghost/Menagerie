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

const ListContainer = observe(({spells}, {subscribe}) =>
	<List spells={getKeys(subscribe('spells').sort(), spells)} />
);

const SpellSelectorContainer = observe(({spells}, {dispatch}) =>
	<Typeahead
		options={values(spells)}
		filterOption='name'
		displayOption='name'
		onOptionSelected={spell => dispatch('spells', spells => Array.from((new Set(spells)).add(spell.id)))}
		showOptionsWhenEmpty={true}
	/>);

export default () => <div>
	<h1>Select spell</h1>
	<SpellSelectorContainer spells={spells} />
	<hr />
	<h1>Spells</h1>
	<ListContainer spells={spells} />
</div>
