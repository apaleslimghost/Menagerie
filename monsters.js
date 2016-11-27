import monsters from './monsters.json';
import mapKeys from 'lodash.mapkeys';
import paramCase from 'param-case';

export default mapKeys(monsters, monster => monster.id = paramCase(monster.name));
