import React from 'react';
import {Link} from 'react-router';
import Markdown from './markdown.jsx';

class SpellCard extends React.Component {
	render() {
		return <article>
			<h1>{this.props.spell.name}</h1>
			<p>
				{this.props.spell.level > 0 ?
					`${this.props.spell.level}th-level ${this.props.spell.school}` :
					`${this.props.spell.school} cantrip`
				}
			</p>
			<Markdown text={this.props.spell['original-description']} />
			<Link to="/all-spells">back</Link>
		</article>;
	}
}

export default SpellCard;
