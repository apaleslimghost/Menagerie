import React from 'react';
import {observe} from '../store';
import styled, {injectGlobal} from 'styled-components';

import List from './list.jsx';
import spells from '../spells';
import {getKeys} from './obj';
import SpellSelectorContainer from './selector.jsx';

injectGlobal`
* { box-sizing: border-box; }

body, html {
	overflow: hidden;
	margin: 0;
}

body {
	font-family: -apple-system, BlinkMacSystemFont, 
		"Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", 
		"Fira Sans", "Droid Sans", "Helvetica Neue", 
		sans-serif;
}

a {
	color: #00dabc;
	text-decoration: none;

	&:hover {
		border-style: dotted;
		border-bottom-width: 1px;
	}
}
`;

const ListContainer = observe(({spells}, {subscribe, dispatch}) =>
	<List
		spells={getKeys(subscribe('spells').sort(), spells)}
	/>);

const ColumnWrapper = styled.div`
display: flex;
`;

const ListColumn = styled.div`
@media screen {
	padding: 1em;
	max-height: 100vh;
	width: ${({width}) => `${100 * width}vw`};
	overflow-y: auto;
}
`;

export default () => <ColumnWrapper>
	<ListColumn width={2/3}>
		<SpellSelectorContainer spells={spells} />
		<ListContainer spells={spells} />
	</ListColumn>
	<ListColumn width={1/3}>
		<SpellSelectorContainer spells={spells} />
		<ListContainer spells={spells} />
	</ListColumn>
</ColumnWrapper>