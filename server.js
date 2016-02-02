import {routeBundler, middleware as reactMiddleware} from '@quarterto/react-server';
import server from '@quarterto/promise-server';
import express from 'express';
import {dbServer} from './db';

const app = express();
app.use('/_api', dbServer);
app.use(server([routeBundler('./index.js'), ...reactMiddleware]));

app.listen(3000, console.log.bind(console, 'listening on 3000'));


