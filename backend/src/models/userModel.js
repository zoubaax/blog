const db = require('../config/db');

const findByEmail = async (email) => {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
};

const create = async (username, email, passwordHash, role = 'user') => {
    const result = await db.query(
        'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role',
        [username, email, passwordHash, role]
    );
    return result.rows[0];
};

module.exports = {
    findByEmail,
    create,
};
