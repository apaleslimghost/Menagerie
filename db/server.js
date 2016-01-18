import PouchDB from 'pouchdb';
import memdown from 'memdown';
import express from 'express';
import morgan  from 'morgan';
import expressPouchDB from 'express-pouchdb';
import wideOpen from '@quarterto/express-cors-wide-open';
import options204 from '@quarterto/options-204';

var MemPouch = PouchDB.defaults({db: memdown});

var app = express();
app.use(morgan('dev'));
app.use(wideOpen);
app.use(options204);;
app.use(expressPouchDB(MemPouch));
app.listen(3001, console.log.bind(console, 'database listening on 3001'));

export default MemPouch;
