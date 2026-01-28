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
    return await articleModel.create(title, content, image_url, authorId);
};

const updateArticle = async (id, data) => {
    // Check existence first
    const existing = await articleModel.findById(id);
    if (!existing) {
        throw new AppError('Article not found', 404);
    }

    const { title, content, image_url } = data;
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
