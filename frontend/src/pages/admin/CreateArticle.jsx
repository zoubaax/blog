import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import articleService from '../../services/articleService';
import ImageUpload from '../../components/ImageUpload';
import { Save, ArrowLeft, Loader2, FileText, Layout } from 'lucide-react';

const CreateArticle = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image_url: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await articleService.create(formData);
            navigate('/dashboard/articles');
        } catch (error) {
            console.error(error);
            alert('Failed to create article');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-2">
                <button
                    onClick={() => navigate('/dashboard/articles')}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:-translate-x-1 transition-transform" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Write New Article</h1>
                    <p className="text-sm text-gray-500">Share your stories and ideas with the community</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 sm:p-10 rounded-[40px] shadow-xl border border-gray-100 relative overflow-hidden">
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

                <div className="space-y-6">
                    {/* Image Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest pl-1">
                            <Layout className="w-4 h-4" /> Header Image
                        </div>
                        <ImageUpload
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
                        </div>
                        <textarea
                            required
                            rows="15"
                            className="w-full px-6 py-5 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all resize-none text-gray-700 leading-relaxed placeholder:text-gray-300"
                            placeholder="Start writing your story here..."
                            value={formData.content}
                            onChange={(e) => setFormData(p => ({ ...p, content: e.target.value }))}
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-8 border-t border-gray-50">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center justify-center gap-3 bg-blue-600 text-white px-12 py-4 rounded-2xl font-bold hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-blue-100 disabled:opacity-70"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Publishing...</span>
                            </>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                <span>Publish Article</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateArticle;
