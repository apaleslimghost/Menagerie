import React from 'react';
import map from 'lodash.map';

const List = ({spells, isSelected, select}) => <ul>
	{map(spells, spell => <li key={spell.id}>
		{isSelected && <input disabled type='checkbox' checked={isSelected(spell)} />}
		{select ? <a href='#' onClick={() => select(spell)}>{spell.name}</a> : spell.name}
	</li>)}
</ul>;

export default List;

