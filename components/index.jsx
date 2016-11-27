import React from 'react';
import {observe} from '../store';
import styled, {injectGlobal} from 'styled-components';

import List from './list.jsx';
import spells from '../spells';
import {getKeys} from './obj';
import SpellSelectorContainer from './selector.jsx';

injectGlobal`
* { box-sizing: border-box; }

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

const Wrapper = styled.div`
font-family: -apple-system, BlinkMacSystemFont, 
	"Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", 
	"Fira Sans", "Droid Sans", "Helvetica Neue", 
	sans-serif;
`;

export default () => <Wrapper>
	<SpellSelectorContainer spells={spells} />
	<ListContainer spells={spells} />
</Wrapper>
