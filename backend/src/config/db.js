const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

const connectionConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    // Connection pool settings
    max: 20, // Max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    connectionTimeoutMillis: 2000, // how long to wait for a connection
};

// Add SSL for production (required by most cloud providers like Render/Heroku)
if (isProduction) {
    connectionConfig.ssl = {
        rejectUnauthorized: false,
    };
}

const pool = new Pool(connectionConfig);

// Global header for handling pool errors (e.g. backend crashes)
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool, // Export pool for transaction scenarios
};
