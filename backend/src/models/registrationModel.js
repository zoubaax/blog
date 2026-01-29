const db = require('../config/db');

const create = async (event_id, full_name, email, phone, school_name, agreed_to_policies) => {
    const result = await db.query(
        'INSERT INTO event_registrations (event_id, full_name, email, phone, school_name, agreed_to_policies) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [event_id, full_name, email, phone, school_name, agreed_to_policies]
    );
    return result.rows[0];
};

const findByEvent = async (event_id) => {
    const result = await db.query(
        'SELECT * FROM event_registrations WHERE event_id = $1 ORDER BY created_at DESC',
        [event_id]
    );
    return result.rows;
};

module.exports = {
    create,
    findByEvent
};
