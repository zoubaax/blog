import api from './api';

const registrationService = {
    register: async (data) => {
        return await api.post('/registrations', data);
    },

    getRegistrationsByEvent: async (eventId) => {
        return await api.get(`/registrations/${eventId}`);
    }
};

export default registrationService;
