import React from 'react';
import {DefinitionList, Def, Description, Title, Subtitle, Card} from './styled.jsx';
import {ThemeProvider} from 'styled-components';
import {orangeCard} from './themes';

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
	: duration.type === 'special' ? 'Special'
	: `Up to ${renderTime(duration)}${concentration ? ' (concentration)' : ''}`;

const ord = n => n + (({
	1: 'st',
	2: 'nd',
	3: 'rd'
})[n] || 'th');

const renderLevelAndSchool = ({level, school}) =>
	level > 0 ? `${ord(level)}-level ${school}`
	: `${school} cantrip`

const SpellCard = ({item: spell}) => <ThemeProvider theme={orangeCard}>
	<Card>
		<Title>{spell.name}</Title>
		<Subtitle>{renderLevelAndSchool(spell)}</Subtitle>
		<DefinitionList>
			<Def title='Casting Time'>
				{renderTime(spell['casting-time'])}
			</Def>
			<Def title='Range'>
				{renderRange(spell)}
			</Def>
			<Def title='Components'>
				{renderComponents(spell)}
			</Def>
			<Def title='Duration'>
				{renderDuration(spell)}
			</Def>
		</DefinitionList>

		<Description text={spell['original-description']} />
	</Card>
</ThemeProvider>;

export default SpellCard;