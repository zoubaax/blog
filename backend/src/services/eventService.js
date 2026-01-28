const eventModel = require('../models/eventModel');
const AppError = require('../utils/appError');

const getAllEvents = async () => {
    return await eventModel.findAll();
};

const getEventById = async (id) => {
    const event = await eventModel.findById(id);
    if (!event) {
        throw new AppError('Event not found', 404);
    }
    return event;
};

const createEvent = async (data) => {
    const { title, description, date, location, cover_image_url } = data;
    // Simple logic validation can go here
    if (new Date(date) < new Date()) {
        // Optionally prevent past events?
        // throw new AppError('Event date cannot be in the past', 400); 
    }
    return await eventModel.create(title, description, date, location, cover_image_url);
};

const updateEvent = async (id, data) => {
    const existing = await eventModel.findById(id);
    if (!existing) {
        throw new AppError('Event not found', 404);
    }

    const { title, description, date, location, cover_image_url } = data;
    return await eventModel.update(id, title, description, date, location, cover_image_url);
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
