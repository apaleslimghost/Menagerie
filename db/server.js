import PouchDB from 'pouchdb';
import memdown from 'memdown';
import express from 'express';
import morgan  from 'morgan';
import expressPouchDB from 'express-pouchdb'

var MemPouch = PouchDB.defaults({db: memdown});

var app = express();
app.use(morgan('dev'));
app.use(function(req, res, next) {
	res.set('access-control-allow-origin', req.headers.origin);
	res.set('access-control-allow-credentials', true);
	res.set('access-control-allow-headers', req.headers['access-control-request-headers']);
	res.set('access-control-allow-method', '*');
	next();
});
app.use(function(req, res, next) {
	if(req.method !== 'OPTIONS') return next();
	res.sendStatus(204);
})
app.use(expressPouchDB(MemPouch));

var port = 3001;
app.listen(3001, console.log.bind(console, 'database listening on 3001'));

export default MemPouch;
