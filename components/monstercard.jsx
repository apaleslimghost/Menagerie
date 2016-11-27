import React from 'react';
import {Title, Card, Subtitle} from './styled.jsx';
import styled, {ThemeProvider} from 'styled-components';
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

const MonsterCard = ({item: monster}) => <ThemeProvider theme={redCard}>
	<Card>
		<Title>{monster.name}</Title>
		<Subtitle>{monster.size} {monster.type}, {monster.alignment}</Subtitle>
		<dl>
			<dt>Armour Class</dt>
			<dd>{monster.armor_class}</dd>
			<dt>Hit Points</dt>
			<dd>{monster.hit_points} ({monster.hit_dice})</dd>
			<dt>Speed</dt>
			<dd>{monster.speed}</dd>
		</dl>

		<dl>
			{stats.map(stat => <div>
				<Stat>{abbreviateStat(stat)}</Stat>
				<dd>{monster[stat]} ({mod(monster[stat])})</dd>
			</div>)}
		</dl>

		<dl>
			<dt>Saving throws</dt>
			<dd>{renderSaves(monster)}</dd>
		</dl>
	</Card>
</ThemeProvider>;

export default MonsterCard;