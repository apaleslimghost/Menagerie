import React from 'react';

var SpellCard = ({spell}) => <article>
	<h1>{spell.name}</h1>
	<a href="/">back</a>
</article>;

export default SpellCard;
