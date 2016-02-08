import _csvParse from 'csv-parse';
import {readFile as _readFile} from 'fs';
import promisify from '@quarterto/promisify';
import paramCase from 'param-case';
import mapValues from 'lodash.mapvalues';

const csvParse = promisify(_csvParse);
const readFile = promisify(_readFile);

function renameColumn(col) {
  switch(col) {
  case 'Spell Name': return 'name';
  case 'Component(s)': return 'components';
  default: return paramCase(col);
  }
}

function modifySpellProp(v, k) {
  switch(k) {
  case 'v':
  case 's':
  case 'm':
    return !!v;
  case 'level': return parseInt(v, 10);
  default: return v;
  }
}

readFile('spells.csv')
  .then(data => csvParse(data, {columns: cols => cols.map(renameColumn)}))
  .then(list => list.filter(spell => spell.name))
  .then(list => list.map(spell => mapValues(spell, modifySpellProp)))
  .then(console.log)
  .catch(e => console.error(e.stack));
