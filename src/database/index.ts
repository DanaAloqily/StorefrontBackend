import {Pool} from 'pg';
import config from '../middleware/config';

const client = new Pool({
    host: config.host,
    database: config.database,
    user:config.user,
    password: config.password,
    port: parseInt(config.dbport as string)
});
client.on('error',(error: Error) => {
    console.error(error.message);
});


export default client;