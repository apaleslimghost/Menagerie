import React from 'react';
import {Router, Route} from 'react-router';
import {syncedHistory} from '../store';

import SpellPage from './spellpage.jsx';
import List from './list.jsx';
import FilteredSpells from './filtered-spells.jsx';

import spells from '../spells';

const withProps = (Component, moreProps) => props => <Component {...moreProps} {...props} />;

export default () => <Router history={syncedHistory}>
	<Route path="/" component={FilteredSpells} />
	<Route path="/all-spells" component={withProps(List, {spells})}/>
	<Route path="/spell/:spellid" component={withProps(SpellPage, {spells})}/>
</Router>;

