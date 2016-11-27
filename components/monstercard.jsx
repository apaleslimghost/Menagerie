import React from 'react';
import {Title, Card, Subtitle} from './styled.jsx';
import styled, {ThemeProvider} from 'styled-components';
import Markdown from './markdown.jsx';
import {redCard} from './themes';

const modifier = stat => Math.floor((stat - 10) / 2);
const formatModifier = mod => `${mod >= 0 ? '+' : ''}${mod}`;
const mod = stat => formatModifier(modifier(stat));

const stats = [
	'strength',
	'dexterity',
	'constitution',
	'intelligence',
	'wisdom',
	'charisma'
];
const abbreviateStat = stat => stat.slice(0, 1).toUpperCase() + stat.slice(1, 3);

const Stat = styled.dt`
text-transform: uppercase;
font-weight: bold;
`;

const renderSaves = monster => stats.reduce((saves, stat) => {
	if(monster[`${stat}_save`]) {
		saves.push(`${abbreviateStat(stat)} ${formatModifier(monster[`${stat}_save`])}`);
	}

	return saves;
}, []).join(', ');

const skillNames = [
	'Athletics',
	'Acrobatics',
	'Stealth',
	'Arcana',
	'History',
	'Investigation',
	'Nature',
	'Religion',
	'Insight',
	'Medicine',
	'Perception',
	'Survival',
	'Deception',
	'Intimidation',
	'Performance',
	'Persuasion',
]

const renderSkills = monster => skillNames.reduce((skills, skill) => {
	if(monster[skill.toLowerCase()]) {
		skills.push(`${skill} ${formatModifier(monster[skill.toLowerCase()])}`);
	}

	return skills;
}, []).join(', ');

const crToXP = {
	'0': 10,
	'1/8': 25,
	'1/4': 50,
	'1/2': 100,
	'1': 200,
	'2': 450,
	'3': 700,
	'4': 1100,
	'5': 1800,
	'6': 2300,
	'7': 2900,
	'8': 3900,
	'9': 5000,
	'10': 5900,
	'11': 7200,
	'12': 8400,
	'13': 10000,
	'14': 11500,
	'15': 13000,
	'16': 15000,
	'17': 18000,
	'18': 20000,
	'19': 22000,
	'20': 25000,
	'21': 33000,
	'22': 41000,
	'23': 50000,
	'24': 62000,
	'25': 75000,
	'26': 90000,
	'27': 105000,
	'28': 120000,
	'29': 135000,
	'30': 155000,
};

const Crunch = styled.dl`
display: block;
margin-bottom: 1em;

dd, dt {
	display: inline;
}

dt {
	font-weight: bold;

	&:after {
		content: ': ';
	}
}

dd {
	margin: 0;
}
`;

const Ability = styled.div`
font-size: .8em;
margin-bottom: .5em;

dd, dt {
	display: inline;
}

dt {
	font-weight: bold;
	font-style: italic;

	&:after {
		content: '. ';
	}
}

dd {
	margin: 0;

	> div {
		display: inline;

		> p:first-child {
			display: inline;
		}
	}
}

ul {
	margin-top: 1em;
	padding-left: 2em;
	list-style-type: initial;
}
`;

const Stats = styled.dl`
display: flex;
margin: 1em 0;
`;

const StatWrapper = styled.div`
width: 16%;
text-align: center;
`;

const Modifier = styled.dd`
margin: 0;
`;

const CardBody = styled.div`
display: flex;
padding: .5em;
`;

const Column = styled.div`
width: 50%;

&:first-child {
	border-right: 1px ${({theme}) => theme.main} solid;
	padding-right: 1em;
	margin-right: 1em;
}
`;

const Heading = styled.h4`
margin: 0;
`;

const MonsterCard = ({item: monster}) => <ThemeProvider theme={redCard}>
	<Card>
		<Title>{monster.name}</Title>
		<Subtitle>{monster.size} {monster.type}, {monster.alignment}</Subtitle>
		<CardBody>
			<Column>
				<Crunch>
					<div>
						<dt>Armour Class</dt>
						<dd>{monster.armor_class}</dd>
					</div>
					<div>
						<dt>Hit Points</dt>
						<dd>{monster.hit_points} ({monster.hit_dice})</dd>
					</div>
					<div>
						<dt>Speed</dt>
						<dd>{monster.speed}</dd>
					</div>
				</Crunch>

				<Stats>
					{stats.map(stat => <StatWrapper key={stat}>
						<Stat>{abbreviateStat(stat)}</Stat>
						<Modifier>{monster[stat]} ({mod(monster[stat])})</Modifier>
					</StatWrapper>)}
				</Stats>

				<Crunch>
					{renderSaves(monster) && <div>
						<dt>Saving throws</dt>
						<dd>{renderSaves(monster)}</dd>
					</div>}
					{renderSkills(monster) && <div>
						<dt>Skills</dt>
						<dd>{renderSkills(monster)}</dd>
					</div>}
					{monster.senses && <div>
						<dt>Senses</dt>
						<dd>{monster.senses}</dd>
					</div>}
					{monster.languages && <div>
						<dt>Languages</dt>
						<dd>{monster.languages}</dd>
					</div>}
					<div>
						<dt>Challenge</dt>
						<dd>{monster.challenge_rating} ({crToXP[monster.challenge_rating]}XP)</dd>
					</div>
				</Crunch>

				{monster.special_abilities && <dl>{monster.special_abilities.map(ability =>
					<Ability key={ability.name}>
						<dt>{ability.name}</dt>
						<dd><Markdown text={ability.desc} /></dd>
					</Ability>
				)}</dl>}
			</Column>

			<Column>
				<Heading>Actions</Heading>
				<dl>{monster.actions.map(action =>
					<Ability key={action.name}>
						<dt>{action.name}</dt>
						<dd><Markdown text={action.desc} /></dd>
					</Ability>
				)}</dl>

				{monster.legendary_actions && <Heading>Legendary Actions</Heading>}
				{monster.legendary_actions && <dl>{monster.legendary_actions.map(action =>
					<Ability key={action.name}>
						<dt>{action.name}</dt>
						<dd><Markdown text={action.desc} /></dd>
					</Ability>
				)}</dl>}
			</Column>
		</CardBody>
	</Card>
</ThemeProvider>;

export default MonsterCard;