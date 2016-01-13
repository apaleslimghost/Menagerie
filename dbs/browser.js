import PouchDB from '../db';
import {lists, spells} from './base';

spells.replicate.from('http://localhost:3001/spells');
lists.sync('http://localhost:3001/lists', {live: true});

export {lists, spells};
