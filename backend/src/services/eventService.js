const eventModel = require('../models/eventModel');
const AppError = require('../utils/appError');

const getAllEvents = async (isAdmin = false) => {
    if (isAdmin) {
        return await eventModel.findAll();
    }
    return await eventModel.findAllVisible();
};

const getEventById = async (id) => {
    const event = await eventModel.findById(id);
    if (!event) {
        throw new AppError('Event not found', 404);
    }
    return event;
};

const createEvent = async (data) => {
    const { title, description, date, location, cover_image_url, registration_deadline, max_participants } = data;
    return await eventModel.create(
        title,
        description,
        date,
        location,
        cover_image_url,
        registration_deadline || null,
        max_participants || null
    );
};

const updateEvent = async (id, data) => {
    const existing = await eventModel.findById(id);
    if (!existing) {
        throw new AppError('Event not found', 404);
    }

    const {
        title,
        description,
        date,
        location,
        cover_image_url,
        is_hidden,
        registration_deadline,
        max_participants
    } = data;

    const final_is_hidden = is_hidden !== undefined ? is_hidden : existing.is_hidden;

    return await eventModel.update(
        id,
        title || existing.title,
        description || existing.description,
        date || existing.date,
        location || existing.location,
        cover_image_url,
        final_is_hidden,
        registration_deadline !== undefined ? registration_deadline : existing.registration_deadline,
        max_participants !== undefined ? max_participants : existing.max_participants
    );
};

const deleteEvent = async (id) => {
    const existing = await eventModel.findById(id);
    if (!existing) {
        throw new AppError('Event not found', 404);
    }
    return await eventModel.remove(id);
};

module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
};
