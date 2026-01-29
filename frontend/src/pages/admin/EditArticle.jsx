import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import articleService from '../../services/articleService';
import ImageUpload from '../../components/ImageUpload';
import { Save, ArrowLeft, Loader2, FileText, Layout, Eye } from 'lucide-react';

const EditArticle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image_url: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await articleService.getById(id);
                const article = res.data;
                setFormData({
                    title: article.title || '',
                    content: article.content || '',
                    image_url: article.image_url || ''
                });
            } catch (error) {
                console.error('Error fetching article:', error);
                alert('Failed to fetch article data');
                navigate('/dashboard/articles');
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            await articleService.update(id, formData);
            navigate('/dashboard/articles');
        } catch (error) {
            console.error('Update Error:', error);
            alert('Failed to update article');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            <p className="text-gray-500 font-medium text-lg">Loading article content...</p>
        </div>
    );

    return (
        <div className="max-w-3xl mx-auto space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between gap-4 mb-2">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/dashboard/articles')}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Edit Article</h1>
                        <p className="text-sm text-gray-500">Updating your published thoughts</p>
                    </div>
                </div>
                <a
                    href={`/articles/${id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all"
                >
                    <Eye className="w-4 h-4" /> Preview
                </a>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 sm:p-10 rounded-[40px] shadow-xl border border-gray-100 relative overflow-hidden">
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>

                <div className="space-y-6">
                    {/* Image Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest pl-1">
                            <Layout className="w-4 h-4" /> Featured Image
                        </div>
                        <ImageUpload
                            initialImage={formData.image_url}
                            onImageUpload={(url) => setFormData(p => ({ ...p, image_url: url }))}
                        />
                    </div>

                    {/* Title Section */}
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700 pl-1">Article Title</label>
                        <input
                            type="text"
                            required
                            className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-xl font-bold placeholder:text-gray-300"
                            placeholder="Hook your readers with a great title..."
                            value={formData.title}
                            onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))}
                        />
                    </div>

                    {/* Content Section */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between pl-1">
                            <label className="block text-sm font-bold text-gray-700">Content</label>
                            <span className="text-xs text-gray-400 font-medium">Character Count: {formData.content.length}</span>
                        </div>
                        <textarea
                            required
                            rows="15"
                            className="w-full px-6 py-5 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all resize-none text-gray-700 leading-relaxed placeholder:text-gray-300"
                            placeholder="Write your story here... use markdown for better formatting."
                            value={formData.content}
                            onChange={(e) => setFormData(p => ({ ...p, content: e.target.value }))}
                        />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end pt-8 border-t border-gray-50 gap-4">
                    <button
                        type="button"
                        onClick={() => navigate('/dashboard/articles')}
                        className="px-8 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition-all active:scale-95"
                    >
                        Discard Changes
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center justify-center gap-3 bg-blue-600 text-white px-12 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 disabled:opacity-70 disabled:scale-[0.98]"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Saving...</span>
                            </>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                <span>Update Article</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditArticle;
