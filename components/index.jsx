import React from 'react';
import {observe} from '../store';
import styled, {injectGlobal} from 'styled-components';

import spells from '../spells';

import CardList from './list.jsx';
import {getKeys, asSet} from './obj';
import SelectorContainer from './selector.jsx';
import SpellCard from './spellcard.jsx';
import MonsterCard from './monstercard.jsx';
import parseSpellcasting from './parse-spellcasting';
import Import from './import.jsx'; // yo dawg

injectGlobal`
* { box-sizing: border-box; }

@page {
	size: auto;
	margin: 0;
}

body, html {
	margin: 0;

	@media screen {
		overflow: hidden;
	}
}

body {
	font-family: -apple-system, BlinkMacSystemFont,
		"Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell",
		"Fira Sans", "Droid Sans", "Helvetica Neue",
		sans-serif;
}

a {
	color: #00dabc;
	text-decoration: none;

	&:hover {
		border-style: dotted;
		border-bottom-width: 1px;
	}
}
`;

const ListContainer = observe(({data, storeKey, card}, {subscribe, dispatch}) =>
	<CardList
		card={card}
		data={getKeys(subscribe(storeKey).sort(), data)}
	/>);

const ColumnWrapper = styled.div``;

const ListColumn = styled.div`
padding: 1em;

@media screen {
	float: left;
	width: ${({width}) => `${100 * width}vw`};
	height: 100vh;
	overflow-y: auto;
}
`;

const getMonsterSpells = monster => monster.special_abilities.reduce(
	(spells, ability) => spells.concat(parseSpellcasting(ability)),
	[]
);

const removeAll = asSet((a, xs) => xs.forEach(x => a.delete(x)));
const addUniqAll = (a, xs) => Array.from(new Set([...a, ...xs]));

const dispatchIfSpells = (dispatch, fn) => monster => {
	const monsterSpells = getMonsterSpells(monster);
	if(monsterSpells.length) {
		dispatch('spells', spells => fn(spells, monsterSpells));
	}
}

export default observe((_, {dispatch, subscribe}) => <ColumnWrapper>
	<ListColumn width={3/5}>
		<SelectorContainer
			data={subscribe('monsterList')}
			storeKey='monsters'
			placeholder='Search for a monster…'
			onAdd={dispatchIfSpells(dispatch, addUniqAll)}
			onRemove={dispatchIfSpells(dispatch, removeAll)} />
		<Import onImport={data => dispatch('monsterList', () => data)} exportData={subscribe('monsterList')} />
		<ListContainer data={subscribe('monsterList')} storeKey='monsters' card={MonsterCard} />
	</ListColumn>
	<ListColumn width={2/5}>
		<SelectorContainer data={spells} storeKey='spells' placeholder='Search for a spell…' />
		<ListContainer data={spells} storeKey='spells' card={SpellCard} />
	</ListColumn>
</ColumnWrapper>);
