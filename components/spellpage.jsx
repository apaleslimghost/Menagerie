import React from 'react';
import SpellCard from './spellcard.jsx';

export default class SpellPage extends React.Component {
	render() {
		return <SpellCard spell={this.props.spells[this.props.params.spellid]} />;
	}
}
