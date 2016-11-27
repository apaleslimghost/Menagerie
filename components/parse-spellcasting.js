import paramCase from 'param-case';

const parseSpellcasting = ability => {
	if(ability.name.match('Spellcasting')) {
		const lines = ability.desc.match(/^.+: ([\w ]+)(, ([\w ]+))*$/mg);
		return lines.reduce((spells, line) => {
			const [, lineSpells] = line.match(/^.+?: (.+)$/) || [];
			return spells.concat(lineSpells.split(', ').map(paramCase));
		}, []);
	}

	return [];
};

export default parseSpellcasting;