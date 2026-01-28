const teamModel = require('../models/teamModel');
const AppError = require('../utils/appError');

const getAllMembers = async () => {
    return await teamModel.findAll();
};

const getMemberById = async (id) => {
    const member = await teamModel.findById(id);
    if (!member) {
        throw new AppError('Team member not found', 404);
    }
    return member;
};

const createMember = async (data) => {
    const { name, role, photo_url, social_links } = data;

    // Optional: Validate that social_links is a valid object if provided
    // PostgreSQL checks JSONB validity, but we can do extra checks here.

    return await teamModel.create(name, role, photo_url, social_links);
};

const updateMember = async (id, data) => {
    const existing = await teamModel.findById(id);
    if (!existing) {
        throw new AppError('Team member not found', 404);
    }

    const { name, role, photo_url, social_links } = data;
    return await teamModel.update(id, name, role, photo_url, social_links);
};

const deleteMember = async (id) => {
    const existing = await teamModel.findById(id);
    if (!existing) {
        throw new AppError('Team member not found', 404);
    }
    return await teamModel.remove(id);
};

module.exports = {
    getAllMembers,
    getMemberById,
    createMember,
    updateMember,
    deleteMember
};
