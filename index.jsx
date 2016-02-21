import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import SpellCard from './components/spellcard.jsx';
import List from './components/list.jsx';

import spells from './spells';

const withProps = (Component, moreProps) => props => <Component {...moreProps} {...props} />;

ReactDOM.render(<Router history={browserHistory}>
	<Route path="/all-spells" component={withProps(List, {spells})}/>
</Router>, document.querySelector('main'));
