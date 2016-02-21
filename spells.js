import spells from './spells.json';
import mapKeys from 'lodash.mapkeys';
import paramCase from 'param-case';

export default mapKeys(spells, spell => spell.id = paramCase(spell.name));
