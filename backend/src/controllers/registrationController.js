const registrationModel = require('../models/registrationModel');
const eventModel = require('../models/eventModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const register = catchAsync(async (req, res, next) => {
    const { event_id, full_name, email, phone, school_name, agreed_to_policies } = req.body;

    if (!event_id || !full_name || !email || !agreed_to_policies) {
        return next(new AppError('Please fill in all required fields and agree to the policies.', 400));
    }

    // 1. Fetch event to check limits
    const event = await eventModel.findById(event_id);
    if (!event) {
        return next(new AppError('Event not found.', 404));
    }

    // 2. Check Registration Deadline
    if (event.registration_deadline) {
        const deadline = new Date(event.registration_deadline);
        if (new Date() > deadline) {
            return next(new AppError('Registration for this event is now closed (deadline passed).', 400));
        }
    }

    // 3. Check Capacity (Max Participants)
    if (event.max_participants) {
        const currentCount = await registrationModel.countByEvent(event_id);
        if (currentCount >= event.max_participants) {
            return next(new AppError('Sorry, this event has reached its maximum capacity.', 400));
        }
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
