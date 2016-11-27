import React from 'react';
import Markdown from './markdown.jsx';
import styled from 'styled-components';

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

const DefinitionList = styled.dl`
display: flex;
flex-flow: row wrap;
`;
const DefinitionTitle = styled.dt`
margin-bottom: .5em;
font-weight: bold;
`;
const Definition = styled.dd`
margin: 0;
font-size: .8rem;
`;
const DefinitionWrapper = styled.div`
text-align: center;
width: 50%;
padding: .5rem;
border-bottom: .2rem solid #d90;

&:nth-child(2n + 1) {
	border-right: .1rem solid #d90;
}
&:nth-child(2n) {
	border-left: .1rem solid #d90;
}
`;

const Def = ({title, children}) => <DefinitionWrapper>
	<DefinitionTitle>{title}</DefinitionTitle>
	<Definition>{children}</Definition>
</DefinitionWrapper>;

const DescriptionBody = styled.div`
font-family: Georgia;
font-size: .9em;
line-height: 1.4;
padding: .5em;

p:first-child {
	margin-top: 0;
}
p:last-child {
	margin-bottom: 0;
}
`;

const Description = ({text}) => <DescriptionBody>
	<Markdown text={text} />
</DescriptionBody>

const Card = styled.article`
max-width: 30em;
border: .4em solid #d90;
border-radius: .4em;
`;

const Title = styled.h2`
font-family: Georgia;
font-weight: normal;
margin: .2rem 0;
text-align: center;
`;

const School = styled.h3`
font-family: Georgia;
margin: 0;
text-align: center;
font-size: .8rem;
padding: .1rem;

&:before {
	content: '';
	display: block;
	border-top: 1.3rem solid #d90;
	margin: 0rem -2px -1.1rem;
}
`;

const SpellCard = ({item: spell}) => <Card>
	<Title>{spell.name}</Title>
	<School>{renderLevelAndSchool(spell)}</School>
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
</Card>;

export default SpellCard;