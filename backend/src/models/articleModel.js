const db = require('../config/db');

const findAll = async (limit = 10, offset = 0) => {
    const result = await db.query(
        'SELECT a.*, u.username as author_name FROM articles a LEFT JOIN users u ON a.author_id = u.id ORDER BY created_at DESC LIMIT $1 OFFSET $2',
        [limit, offset]
    );
    return result.rows;
};

const findById = async (id) => {
    const result = await db.query(
        'SELECT a.*, u.username as author_name FROM articles a LEFT JOIN users u ON a.author_id = u.id WHERE a.id = $1',
        [id]
    );
    return result.rows[0];
};

const create = async (title, content, imageUrl, authorId) => {
    const result = await db.query(
        'INSERT INTO articles (title, content, image_url, author_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [title, content, imageUrl, authorId]
    );
    return result.rows[0];
};

const update = async (id, title, content, imageUrl) => {
    // We use COALESCE for imageUrl to keep existing if null is passed
    // but title and content are usually required in the form
    const result = await db.query(
        `UPDATE articles 
         SET title = $1, 
             content = $2, 
             image_url = COALESCE($3, image_url), 
             updated_at = CURRENT_TIMESTAMP 
         WHERE id = $4 RETURNING *`,
        [title, content, imageUrl, id]
    );
    return result.rows[0];
};

const remove = async (id) => {
    const result = await db.query('DELETE FROM articles WHERE id = $1 RETURNING id', [id]);
    return result.rows[0];
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};
