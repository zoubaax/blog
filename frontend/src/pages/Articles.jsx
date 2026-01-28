import { useState, useEffect } from 'react';
import articleService from '../services/articleService';
import ArticleCard from '../components/ArticleCard';
import { Loader2 } from 'lucide-react';

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await articleService.getAll();
                // Assuming response structure matches backend: { success: true, count: N, data: [] }
                // Adjust if backend returns array directly or different structure
                // Logic based on previous step where api.js unwraps response.data
                // And controller returns { data: [...] }
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
            <div className="min-h-[50vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center text-red-600">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            <header className="text-center space-y-4 max-w-2xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                    Latest <span className="text-blue-600">Insights</span>
                </h1>
                <p className="text-lg text-gray-600">
                    Explore our collection of stories, news, and updates from our team.
                </p>
            </header>

            {articles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <p className="text-gray-500">No articles found yet. Check back soon!</p>
                </div>
            )}
        </div>
    );
};

export default Articles;
