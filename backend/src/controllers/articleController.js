const articleService = require('../services/articleService');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const getAll = catchAsync(async (req, res) => {
    const articles = await articleService.getAllArticles();
    res.status(200).json({ success: true, count: articles.length, data: articles });
});

const getOne = catchAsync(async (req, res) => {
    const article = await articleService.getArticleById(req.params.id);
    res.status(200).json({ success: true, data: article });
});

const create = catchAsync(async (req, res) => {
    if (!req.body.title || !req.body.content) {
        throw new AppError('Title and Content are required', 400);
    }

    // req.user.id comes from auth middleware
    const newArticle = await articleService.createArticle(req.body, req.user.id);
    res.status(201).json({ success: true, data: newArticle });
});

const update = catchAsync(async (req, res) => {
    const updatedArticle = await articleService.updateArticle(req.params.id, req.body);
    res.status(200).json({ success: true, data: updatedArticle });
});

const remove = catchAsync(async (req, res) => {
    await articleService.deleteArticle(req.params.id);
    res.status(204).json({ success: true, data: null });
});

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
};
