import React from 'react';
import map from 'lodash.map';
import {Link} from 'react-router';

class List extends React.Component {
	render() {
		let {spells} = this.props;
		return <ul>{map(spells, spell => <li key={spell.id}>
			<Link to={`/spell/${spell.id}`}>
				{spell.match ? <div>{spell.match.prefix}<b>{spell.match.match}</b>{spell.match.suffix}</div> : spell.name}
				{spell.match && spell.match.score}
			</Link>
		</li>)}
		</ul>;
	}
};

export default List;

