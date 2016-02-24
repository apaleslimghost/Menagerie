import React from 'react';
import {connect} from 'react-redux';
import List from './list.jsx';
import subseq from '@quarterto/subseq';
import filter from 'lodash.filter';
import sortBy from 'lodash.sortby';
import last from 'lodash.last';
import first from 'lodash.first';

import setFilter from '../actions/set-filter';

const mapStateToProps = state => ({
	spells: state.spellsFilter ? sortBy(filter(
		state.spells,
		spell => spell.match = subseq(state.spellsFilter, spell.name + ' ' + spell['original-description'])
	), spell => last(spell.match) - first(spell.match)) : state.spells,
	filter: state.spellsFilter
});

const mapDispatchToProps = dispatch => ({
	onUpdateFilter: filter => dispatch(setFilter(filter))
});

const FilteredSpells = connect(mapStateToProps, mapDispatchToProps)(props => <div>
	<input onChange={ev => props.onUpdateFilter(ev.target.value)} value={props.filter} />
	<List spells={props.spells} />
</div>);

export default FilteredSpells;
