// Using ESM syntax for exporting
import pg from 'pg';
const { Pool } = pg;


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'users',
    password: 'goitom',
    port: 5000,
});

export default pool;
