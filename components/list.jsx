import React from 'react';
import map from 'lodash.map';
import styled from 'styled-components';
import Card from './spellcard.jsx';

const List = styled.ul`
list-style: none;
padding: 0;
`;
const Item = styled.li`
margin-bottom: 1rem;
`;

const SpellList = ({spells, remove}) => <List>
	{map(spells, spell => <Item key={spell.id}><Card spell={spell} /></Item>)}
</List>;

export default SpellList;

