import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
    // Truncate content for excerpt (strip HTML if you have rich text later)
    const excerpt = article.content.substring(0, 120) + '...';

    return (
        <article className="flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 group">
            {/* Image Container */}
            <div className="h-56 overflow-hidden relative">
                <img
                    src={article.image_url || 'https://images.unsplash.com/photo-1499750310159-52f0f83ad713?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}
                    alt={article.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            </div>

            {/* Content */}
            <div className="flex-1 p-6 flex flex-col">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <time dateTime={article.created_at}>
                            {new Date(article.created_at).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </time>
                    </div>
                    {article.author_name && (
                        <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{article.author_name}</span>
                        </div>
                    )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                    <Link to={`/articles/${article.id}`}>
                        {article.title}
                    </Link>
                </h3>

                <p className="text-gray-600 text-sm mb-6 flex-grow line-clamp-3">
                    {excerpt}
                </p>

                <Link
                    to={`/articles/${article.id}`}
                    className="inline-flex items-center text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors mt-auto"
                >
                    Read Article <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </article>
    );
};

export default ArticleCard;
