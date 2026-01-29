const pool = require('./db');

const initDB = async () => {
    try {
        console.log('--- INITIALIZING SETTINGS & APPLICATIONS TABLES ---');

        // 1. Create Settings table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS settings (
                key VARCHAR(50) PRIMARY KEY,
                value JSONB
            );
        `);
        console.log('✓ Settings table ready');

        // 2. Insert default setting
        await pool.query(`
            INSERT INTO settings (key, value) VALUES ($1, $2) 
            ON CONFLICT (key) DO NOTHING;
        `, ['join_form_enabled', JSON.stringify(true)]);
        console.log('✓ Default settings seeded');

        // 3. Create Applications table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS club_applications (
                id SERIAL PRIMARY KEY,
                full_name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                major VARCHAR(255) NOT NULL,
                motivation TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✓ Club Applications table ready');
        console.log('--- DB INITIALIZATION COMPLETE ---');

    } catch (err) {
        console.error('CRITICAL: DB Initialization failed:', err);
    }
};

module.exports = initDB;
