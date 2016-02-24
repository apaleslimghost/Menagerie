import React from 'react';
import {Link} from 'react-router'

class SpellCard extends React.Component {
	render() {
		return <article>
			<h1>{this.props.spell.name}</h1>
			<p>{this.props.spell['original-description']}</p>
			<Link to="/all-spells">back</Link>
		</article>;
	}
}

export default SpellCard;
