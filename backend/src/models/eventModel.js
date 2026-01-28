const db = require('../config/db');

const findAll = async () => {
    const result = await db.query('SELECT * FROM events ORDER BY date ASC');
    return result.rows;
};

const findById = async (id) => {
    const result = await db.query('SELECT * FROM events WHERE id = $1', [id]);
    return result.rows[0];
};

const create = async (title, description, date, location, coverImageUrl) => {
    const result = await db.query(
        'INSERT INTO events (title, description, date, location, cover_image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [title, description, date, location, coverImageUrl]
    );
    return result.rows[0];
};

const update = async (id, title, description, date, location, coverImageUrl) => {
    const result = await db.query(
        `UPDATE events 
     SET title = $1, description = $2, date = $3, location = $4, 
         cover_image_url = COALESCE($5, cover_image_url), updated_at = CURRENT_TIMESTAMP 
     WHERE id = $6 RETURNING *`,
        [title, description, date, location, coverImageUrl, id]
    );
    return result.rows[0];
};

const remove = async (id) => {
    const result = await db.query('DELETE FROM events WHERE id = $1 RETURNING id', [id]);
    return result.rows[0];
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};
