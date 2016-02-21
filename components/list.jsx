import React from 'react';
import map from 'lodash.map';
import {Link} from 'react-router';

class List extends React.Component {
	render() {
		let {spells} = this.props;
		return <ul>{map(spells, spell => <li key={spell.id}>
			<Link to={`/spell/${spell.id}`}>
				{spell.name} {spell.level}
			</Link>
		</li>)}
		</ul>;
	}
};

export default List;

