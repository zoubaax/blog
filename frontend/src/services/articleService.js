import api from './api';

const articleService = {
    getAll: async () => {
        return await api.get('/articles');
    },

    getById: async (id) => {
        return await api.get(`/articles/${id}`);
    },

    // Admin only
    create: async (data) => {
        return await api.post('/articles', data);
    },

    update: async (id, data) => {
        return await api.put(`/articles/${id}`, data);
    },

    delete: async (id) => {
        return await api.delete(`/articles/${id}`);
    }
};

export default articleService;
