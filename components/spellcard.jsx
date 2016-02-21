import React from 'react';

class SpellCard extends React.Component {
	linkClick(ev) {
		ev.preventDefault();
		this.props.navigate(ev.target.href, {});
	}

	title() {
		return this.props.spell.name;
	}

	render() {
		return <article>
			<h1>{this.props.spell.name}</h1>
			<a href="/" onClick={this.linkClick.bind(this)}>back</a>
		</article>;
	}
}

export default SpellCard;
