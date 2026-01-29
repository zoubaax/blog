const articleModel = require('../models/articleModel');
const AppError = require('../utils/appError');

const getAllArticles = async () => {
    return await articleModel.findAll();
};

const getArticleById = async (id) => {
    const article = await articleModel.findById(id);
    if (!article) {
        throw new AppError('Article not found', 404);
    }
    return article;
};

const createArticle = async (data, authorId) => {
    const { title, content, image_url } = data;
    if (!title || !content) {
        throw new AppError('Title and content are required', 400);
    }
    return await articleModel.create(title, content, image_url || null, authorId);
};

const updateArticle = async (id, data) => {
    const existing = await articleModel.findById(id);
    if (!existing) {
        throw new AppError('Article not found', 404);
    }

    const title = data.title !== undefined ? data.title : existing.title;
    const content = data.content !== undefined ? data.content : existing.content;
    const image_url = data.image_url !== undefined ? data.image_url : existing.image_url;

    return await articleModel.update(id, title, content, image_url);
};

const deleteArticle = async (id) => {
    const existing = await articleModel.findById(id);
    if (!existing) {
        throw new AppError('Article not found', 404);
    }
    return await articleModel.remove(id);
};

module.exports = {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle
};
