const registrationModel = require('../models/registrationModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const register = catchAsync(async (req, res, next) => {
    const { event_id, full_name, email, phone, school_name, agreed_to_policies } = req.body;

    if (!event_id || !full_name || !email || !agreed_to_policies) {
        return next(new AppError('Please fill in all required fields and agree to the policies.', 400));
    }

    try {
        const registration = await registrationModel.create(
            event_id,
            full_name,
            email,
            phone,
            school_name,
            agreed_to_policies
        );

        res.status(201).json({
            status: 'success',
            data: registration
        });
    } catch (err) {
        if (err.code === '23505') {
            return next(new AppError('You have already registered for this event with this email.', 400));
        }
        next(err);
    }
});

const getRegistrations = catchAsync(async (req, res, next) => {
    const registrations = await registrationModel.findByEvent(req.params.eventId);

    res.status(200).json({
        status: 'success',
        results: registrations.length,
        data: registrations
    });
});

module.exports = {
    register,
    getRegistrations
};
