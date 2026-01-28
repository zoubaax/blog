const db = require('../config/db');

const findAll = async () => {
    // Order by ID or creation time, or potentially add a 'rank' column later for specific ordering
    const result = await db.query('SELECT * FROM team_members ORDER BY id ASC');
    return result.rows;
};

const findById = async (id) => {
    const result = await db.query('SELECT * FROM team_members WHERE id = $1', [id]);
    return result.rows[0];
};

const create = async (name, role, photoUrl, socialLinks) => {
    const result = await db.query(
        'INSERT INTO team_members (name, role, photo_url, social_links) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, role, photoUrl, socialLinks]
    );
    return result.rows[0];
};

const update = async (id, name, role, photoUrl, socialLinks) => {
    const result = await db.query(
        `UPDATE team_members
         SET name = $1, role = $2, photo_url = COALESCE($3, photo_url), social_links = COALESCE($4, social_links)
         WHERE id = $5 RETURNING *`,
        [name, role, photoUrl, socialLinks, id]
    );
    return result.rows[0];
};

const remove = async (id) => {
    const result = await db.query('DELETE FROM team_members WHERE id = $1 RETURNING id', [id]);
    return result.rows[0];
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};
