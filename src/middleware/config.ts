//Configurations file

import dotenv from 'dotenv';

dotenv.config();

const {
    PORT,
    NODE_env,
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD} = process.env;

export default {
    env:NODE_env,
    port: PORT,
    host: POSTGRES_HOST,
    dbport:POSTGRES_PORT,
    database: NODE_env === 'dev'? POSTGRES_DB : POSTGRES_DB_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD

};

