import React from 'react';
import styled from 'styled-components';

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

const MonsterCard = ({item: monster}) => <Card>
	<Title>{monster.name}</Title>
</Card>;

export default MonsterCard;