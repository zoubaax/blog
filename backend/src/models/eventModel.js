const db = require('../config/db');

// Public view: only visible events
const findAllVisible = async () => {
    const result = await db.query('SELECT * FROM events WHERE is_hidden = false ORDER BY date ASC');
    return result.rows;
};

// Admin view: all events including hidden ones
const findAll = async () => {
    const result = await db.query('SELECT * FROM events ORDER BY date ASC');
    return result.rows;
};

const findById = async (id) => {
    const result = await db.query('SELECT * FROM events WHERE id = $1', [id]);
    return result.rows[0];
};

const create = async (title, description, date, location, coverImageUrl, registrationDeadline, maxParticipants) => {
    const result = await db.query(
        'INSERT INTO events (title, description, date, location, cover_image_url, registration_deadline, max_participants) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [title, description, date, location, coverImageUrl, registrationDeadline, maxParticipants]
    );
    return result.rows[0];
};

const update = async (id, title, description, date, location, coverImageUrl, is_hidden, registrationDeadline, maxParticipants) => {
    // Final check for the database format
    const dbMaxParticipants = (maxParticipants === null || maxParticipants === '') ? null : parseInt(maxParticipants);
    const dbDeadline = (registrationDeadline === null || registrationDeadline === '') ? null : registrationDeadline;

    console.log(`[MODEL] Executing Update for ID ${id}. DB MaxParticipants: ${dbMaxParticipants}`);

    const result = await db.query(
        `UPDATE events 
         SET title = $1, 
             description = $2, 
             date = $3, 
             location = $4, 
             cover_image_url = $5, 
             is_hidden = $6,
             registration_deadline = $7,
             max_participants = $8,
             updated_at = CURRENT_TIMESTAMP 
         WHERE id = $9 RETURNING *`,
        [title, description, date, location, coverImageUrl, is_hidden, dbDeadline, dbMaxParticipants, id]
    );

    return result.rows[0];
};

const remove = async (id) => {
    const result = await db.query('DELETE FROM events WHERE id = $1 RETURNING id', [id]);
    return result.rows[0];
};

module.exports = {
    findAll,
    findAllVisible,
    findById,
    create,
    update,
    remove,
};
