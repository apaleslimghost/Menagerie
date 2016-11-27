import React from 'react';
import map from 'lodash.map';
import styled from 'styled-components';

const List = styled.ul`
list-style: none;
padding: 0;
`;
const Item = styled.li`
display: inline-block;
margin: 0 1rem 1rem 0;
vertical-align: top;
`;

const CardList = ({data, remove, card: Card}) => <List>
	{map(data, item => <Item key={item.id}><Card item={item} /></Item>)}
</List>;

export default CardList;

