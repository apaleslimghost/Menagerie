import React from 'react';
import route from '@quarterto/boulevard-promise-server';
import {spells} from './dbs';
import SpellCard from './components/spellcard';

module.exports = route({
	'/spell/:id': (req, params) => {
		return spells.get(params.id).then(
			spell => <SpellCard spell={spell} />,
			err => <h1>Spell {params.id} not found</h1>
		);
	}
});
