import React from 'react';
import {Link} from 'react-router';
import Markdown from './markdown.jsx';

const renderTime = ({type, size}) => `${size} ${type}`;

const renderComponents = ({v, s, m, components}) => [
	v && 'V',
	s && 'S',
	m && `M (${components})`
].filter(Boolean).join(', ');

const renderDistance = ({type, size}) =>
	  type === 'touch' ? 'Touch'
	: type === 'self' ? 'Self'
	: renderTime({type, size});

const renderArea = ({type, size, text}) => 
	  type === 'objects-less-than' ? `Up to ${size} objects`
	: type === 'creatures-less-than' ? `Up to ${size} objects`
	: type === 'unknown' ? text
	: renderDistance({type, size});

const renderRange = ({range, 'target-area': targetArea}) =>
	`${renderDistance(range)}${targetArea ? ` (${renderArea(targetArea)})` : ''}`

const renderDuration = ({duration, concentration}) =>
	duration.type === 'instant' ? 'Instant'
	: `Up to ${renderTime(duration)}${concentration ? ' (concentration)' : ''}`;

const ord = n => n + (({
	1: 'st',
	2: 'nd',
	3: 'rd'
})[n] || 'th');

class SpellCard extends React.Component {
	render() {
		return <article>
			<h1>{this.props.spell.name}</h1>
			<dl>
				<dt>Casting Time</dt>
				<dd>{renderTime(this.props.spell['casting-time'])}</dd>
				<dt>Range</dt>
				<dd>{renderRange(this.props.spell)}</dd>
				<dt>Components</dt>
				<dd>{renderComponents(this.props.spell)}</dd>
				<dt>Duration</dt>
				<dd>{renderDuration(this.props.spell)}</dd>
			</dl>
			<p>
				{this.props.spell.level > 0 ?
					`${ord(this.props.spell.level)}-level ${this.props.spell.school}` :
					`${this.props.spell.school} cantrip`
				}
			</p>
			<Markdown text={this.props.spell['original-description']} />
			<Link to="/all-spells">back</Link>
		</article>;
	}
}

export default SpellCard;