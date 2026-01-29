import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import articleService from '../services/articleService';
import { Calendar, User, ArrowLeft, Loader2, Clock } from 'lucide-react';

const ArticleDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await articleService.getById(id);
                setArticle(response.data);
            } catch (err) {
                setError('Article not found or failed to load.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    if (error || !article) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
                <p className="text-red-600 text-lg">{error || 'Something went wrong'}</p>
                <button onClick={() => navigate('/articles')} className="text-blue-600 font-medium hover:underline">Go back to articles</button>
            </div>
        );
    }

    const publishDate = new Date(article.created_at);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in duration-700">
            <button
                onClick={() => navigate('/articles')}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-8 group"
            >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to Articles
            </button>

            <article className="space-y-8">
                {/* Header */}
                <header className="space-y-6">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl leading-tight">
                        {article.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-gray-500 font-medium pb-8 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <Calendar className="w-4 h-4" />
                            </div>
                            <span>{publishDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                                <User className="w-4 h-4" />
                            </div>
                            <span>{article.author_name || 'Admin'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                                <Clock className="w-4 h-4" />
                            </div>
                            <span>{Math.ceil(article.content.split(' ').length / 200)} min read</span>
                        </div>
                    </div>
                </header>

                {/* Cover Image */}
                <div className="rounded-[40px] overflow-hidden shadow-2xl aspect-video max-h-[500px]">
                    <img
                        src={article.image_url || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1200'}
                        alt={article.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="prose prose-lg lg:prose-xl max-w-none text-gray-700 leading-relaxed py-8">
                    <p className="whitespace-pre-line">{article.content}</p>
                </div>

                {/* Footer / Author Box */}
                <footer className="mt-12 p-8 bg-gray-50 rounded-[40px] border border-gray-100 flex items-center gap-6">
                    <div className="w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
                        {(article.author_name || 'A')[0]}
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Written By</p>
                        <h4 className="text-xl font-bold text-gray-900">{article.author_name || 'Admin User'}</h4>
                        <p className="text-gray-500 text-sm mt-1">Passionate writer and contributor to our blog community.</p>
                    </div>
                </footer>
            </article>
        </div>
    );
};

export default ArticleDetail;
