import React from 'react';
import {Link} from 'react-router';

const List = ({spells}) => <ul>{spells.map(
		spell => <li>
			<Link to={`/spell/${spell.id}`}>
				{spell.name}
			</Link>
		</li>
	)}
</ul>;

export default List;
