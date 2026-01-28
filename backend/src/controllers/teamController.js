const teamService = require('../services/teamService');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const getAll = catchAsync(async (req, res) => {
    const members = await teamService.getAllMembers();
    res.status(200).json({ success: true, count: members.length, data: members });
});

const getOne = catchAsync(async (req, res) => {
    const member = await teamService.getMemberById(req.params.id);
    res.status(200).json({ success: true, data: member });
});

const create = catchAsync(async (req, res) => {
    const { name, role } = req.body;

    if (!name || !role) {
        throw new AppError('Name and Role are required', 400);
    }

    const newMember = await teamService.createMember(req.body);
    res.status(201).json({ success: true, data: newMember });
});

const update = catchAsync(async (req, res) => {
    const updatedMember = await teamService.updateMember(req.params.id, req.body);
    res.status(200).json({ success: true, data: updatedMember });
});

const remove = catchAsync(async (req, res) => {
    await teamService.deleteMember(req.params.id);
    res.status(204).json({ success: true, data: null });
});

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
};
