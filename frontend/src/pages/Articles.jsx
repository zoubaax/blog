import { useState, useEffect } from 'react';
import articleService from '../services/articleService';
import ArticleCard from '../components/ArticleCard';
import { Loader2, BookOpen, TrendingUp, Sparkles } from 'lucide-react';

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await articleService.getAll();
                setArticles(response.data || []);
            } catch (err) {
                setError('Failed to load articles. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                <p className="text-gray-600 font-medium">Loading articles...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-4">
                    <BookOpen className="w-8 h-8 text-red-500" />
                </div>
                <p className="text-red-600 font-semibold">{error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-16 py-8">
            {/* Animated Header */}
            <header className="relative text-center space-y-6 max-w-4xl mx-auto px-4">
                {/* Decorative Elements */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-30 animate-pulse" />

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-bold text-blue-700 uppercase tracking-wider">Knowledge Hub</span>
                </div>

                {/* Main Title */}
                <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                    Latest <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Insights</span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                    Explore our collection of stories, research, and updates from the [UIT] Club community.
                </p>

                {/* Stats */}
                <div className="flex items-center justify-center gap-8 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                    <div className="flex items-center gap-2 text-gray-600">
                        <TrendingUp className="w-5 h-5 text-emerald-500" />
                        <span className="font-semibold">{articles.length} Articles</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full" />
                    <div className="text-gray-600">
                        <span className="font-semibold">Updated Weekly</span>
                    </div>
                </div>

                {/* Decorative Line */}
                <div className="flex items-center justify-center gap-4 pt-6">
                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-gray-300" />
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-gray-300" />
                </div>
            </header>

            {/* Articles Grid */}
            {articles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
                    {articles.map((article, index) => (
                        <div
                            key={article.id}
                            className="animate-in fade-in slide-in-from-bottom-4 duration-700"
                            style={{ animationDelay: `${400 + index * 100}ms` }}
                        >
                            <ArticleCard article={article} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <BookOpen className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Articles Yet</h3>
                    <p className="text-gray-500">Check back soon for exciting new content!</p>
                </div>
            )}
        </div>
    );
};

export default Articles;
