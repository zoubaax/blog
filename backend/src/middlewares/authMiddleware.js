const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const db = require('../config/db');

const protect = async (req, res, next) => {
    let token;

    // 1. Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('Not authorized to access this route', 401));
    }

    try {
        // 2. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Check if user still exists (Optional but recommended)
        const result = await db.query('SELECT id, role FROM users WHERE id = $1', [decoded.id]);
        if (!result.rows[0]) {
            return next(new AppError('User belonging to this token no longer exists', 401));
        }

        req.user = result.rows[0];
        next();
    } catch (error) {
        return next(new AppError('Not authorized to access this route', 401));
    }
};

const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action', 403));
        }
        next();
    };
};

module.exports = { protect, restrictTo };
