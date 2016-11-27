import React from 'react';
import map from 'lodash.map';
import Card from './spellcard.jsx';

const List = ({spells, remove}) => <div>
	{map(spells, spell => <div key={spell.id}><Card spell={spell} /><hr/></div>)}
</div>;

export default List;

