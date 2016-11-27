import React from 'react';
import {Title, Card} from './styled.jsx';
import {ThemeProvider} from 'styled-components';
import {redCard} from './themes';

const MonsterCard = ({item: monster}) => <ThemeProvider theme={redCard}>
	<Card>
		<Title>{monster.name}</Title>
	</Card>
</ThemeProvider>;

export default MonsterCard;