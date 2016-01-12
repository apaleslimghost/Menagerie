import React from 'react';
import route from '@quarterto/boulevard-promise-server';

module.exports = route({
	'/': () => <h1>it works</h1>
});
