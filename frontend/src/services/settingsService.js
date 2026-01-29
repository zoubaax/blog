import api from './api';

const settingsService = {
    getJoinStatus: async () => {
        return await api.get('/settings/join-status');
    },

    submitApplication: async (data) => {
        return await api.post('/settings/apply', data);
    },

    // Admin only
    toggleJoinForm: async (enabled) => {
        return await api.put('/settings/join-toggle', { enabled });
    },

    getApplications: async () => {
        return await api.get('/settings/applications');
    }
};

export default settingsService;
