import React from 'react';

class SpellCard extends React.Component {
	title() {
		return this.props.spell.name;
	}

	render() {
		return <article>
			<h1>{this.props.spell.name}</h1>
			<a href="/">back</a>
		</article>;
	}
}

export default SpellCard;
