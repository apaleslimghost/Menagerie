import React from 'react';
import {observe} from '../store';
import styled, {injectGlobal} from 'styled-components';

import List from './list.jsx';
import spells from '../spells';
import {getKeys} from './obj';
import SpellSelectorContainer from './selector.jsx';

injectGlobal`
* { box-sizing: border-box; }

@page {
	size: auto;
	margin: 0;
}

body, html {
	margin: 0;

	@media screen {
		overflow: hidden;
	}
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

const ColumnWrapper = styled.div``;

const ListColumn = styled.div`
padding: 1em;
width: ${({width}) => `${100 * width}vw`};
float: left;

@media screen {
	max-height: 100vh;
	overflow-y: auto;
}
`;

export default () => <ColumnWrapper>
	<ListColumn width={3/5}>
		<SpellSelectorContainer spells={spells} />
		<ListContainer spells={spells} />
	</ListColumn>
	<ListColumn width={2/5}>
		<SpellSelectorContainer spells={spells} />
		<ListContainer spells={spells} />
	</ListColumn>
</ColumnWrapper>