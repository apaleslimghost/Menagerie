import React from 'react';
import map from 'lodash.map';

const List = ({spells, remove}) => <ul>
	{map(spells, spell => <li key={spell.id}>
		{spell.name}
		{remove && <button onClick={() => remove(spell)}>✖️</button>}
	</li>)}
</ul>;

export default List;

