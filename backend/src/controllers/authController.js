const authService = require('../services/authService');
const catchAsync = require('../utils/catchAsync');

const register = catchAsync(async (req, res) => {
    const user = await authService.register(req.body);
    res.status(201).json({ success: true, data: user });
});

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.status(200).json({ success: true, token });
});

module.exports = {
    register,
    login
};
