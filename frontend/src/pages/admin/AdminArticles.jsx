import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import articleService from '../../services/articleService';
import { Plus, Trash2, Edit2, Loader2, Calendar, User, FileText, ExternalLink } from 'lucide-react';

const AdminArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadArticles();
    }, []);

    const loadArticles = async () => {
        try {
            const res = await articleService.getAll();
            setArticles(res.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
            try {
                await articleService.delete(id);
                setArticles(articles.filter(a => a.id !== id));
            } catch (error) {
                alert('Failed to delete article');
            }
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            <p className="text-gray-500 font-medium">Fetching your articles...</p>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Manage Articles</h1>
                    <p className="text-gray-500 mt-1">Create, edit and manage your blog posts</p>
                </div>
                <NavLink
                    to="/dashboard/articles/new"
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-200"
                >
                    <Plus className="w-5 h-5" /> Write Article
                </NavLink>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                    <div key={article.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-blue-100 transition-all group flex flex-col">
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={article.image_url || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800'}
                                alt={article.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-4 right-4 flex gap-2">
                                <button
                                    onClick={() => navigate(`/dashboard/articles/edit/${article.id}`)}
                                    className="p-2 bg-white/90 backdrop-blur-sm text-amber-500 rounded-full shadow-lg hover:bg-amber-500 hover:text-white transition-all transform hover:rotate-12"
                                    title="Edit Article"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(article.id)}
                                    className="p-2 bg-white/90 backdrop-blur-sm text-red-500 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-all transform hover:-rotate-12"
                                    title="Delete Article"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="font-bold text-gray-900 text-xl mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                                {article.title}
                            </h3>

                            <div className="space-y-2 mb-4 mt-auto">
                                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                    <Calendar className="w-4 h-4 text-blue-500" />
                                    <span>{new Date(article.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                    <User className="w-4 h-4 text-purple-500" />
                                    <span>{article.author_name || 'Admin'}</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-widest">
                                    <FileText className="w-3.5 h-3.5" /> Published
                                </div>
                                <NavLink
                                    to={`/articles/${article.id}`}
                                    className="text-gray-400 hover:text-blue-600 transition-colors"
                                    title="View Public Link"
                                >
                                    <ExternalLink className="w-5 h-5" />
                                </NavLink>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {articles.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
                    <div className="w-20 h-20 bg-white text-gray-300 rounded-[30px] flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <FileText className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">No Articles Yet</h3>
                    <p className="text-gray-500 mt-2 max-w-xs mx-auto">Start sharing your thoughts with the world by creating your first article.</p>
                    <NavLink
                        to="/dashboard/articles/new"
                        className="inline-flex items-center gap-2 mt-8 text-blue-600 font-bold hover:underline"
                    >
                        Create your first post <Plus className="w-4 h-4" />
                    </NavLink>
                </div>
            )}
        </div>
    );
};

export default AdminArticles;
