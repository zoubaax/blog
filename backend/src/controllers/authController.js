const authService = require('../services/authService');
const catchAsync = require('../utils/catchAsync');

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        // Basic input validation
        throw new Error('Please provide email and password'); // Or use AppError
    }

    const { user, token } = await authService.login(email, password);

    res.status(200).json({
        success: true,
        token,
        user
    });
});

const registerAdmin = catchAsync(async (req, res) => {
    const { username, email, password } = req.body;
    const user = await authService.registerAdmin(username, email, password);

    res.status(201).json({
        success: true,
        data: user
    });
});

module.exports = {
    login,
    registerAdmin
};
