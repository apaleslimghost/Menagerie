import PouchDB from '../db';
import {lists, spells} from './base';

const apiBase = `${location.protocol}//${location.host}/_api`;

spells.replicate.from(`${apiBase}/spells`);
lists.sync(`${apiBase}/lists`, {live: true});

export {lists, spells};
