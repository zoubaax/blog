import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
    const excerpt = article.content.substring(0, 150) + '...';
    const readTime = Math.ceil(article.content.length / 1000);

    return (
        <article className="group relative flex flex-col bg-white rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100">
            {/* Image Container with Gradient Overlay */}
            <Link to={`/articles/${article.id}`} className="relative h-64 overflow-hidden">
                <img
                    src={article.image_url || 'https://images.unsplash.com/photo-1499750310159-52f0f83ad713?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}
                    alt={article.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                {/* Floating Badge */}
                <div className="absolute top-4 right-4">
                    <div className="px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
                            <Clock className="w-3.5 h-3.5 text-blue-600" />
                            <span>{readTime} min read</span>
                        </div>
                    </div>
                </div>
            </Link>

            {/* Content */}
            <div className="flex-1 p-7 flex flex-col">
                {/* Meta Information */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                        <Calendar className="w-3.5 h-3.5 text-blue-500" />
                        <time dateTime={article.created_at}>
                            {new Date(article.created_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </time>
                    </div>
                    {article.author_name && (
                        <>
                            <span className="text-gray-300">•</span>
                            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                                <User className="w-3.5 h-3.5 text-purple-500" />
                                <span>{article.author_name}</span>
                            </div>
                        </>
                    )}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                    <Link to={`/articles/${article.id}`} className="hover:underline decoration-2 underline-offset-4">
                        {article.title}
                    </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                    {excerpt}
                </p>

                {/* Read More Link */}
                <Link
                    to={`/articles/${article.id}`}
                    className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm hover:gap-3 transition-all duration-300 group/link"
                >
                    <span>Continue Reading</span>
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                </Link>
            </div>

            {/* Decorative Corner Accent */}
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tl-full" />
        </article>
    );
};

export default ArticleCard;
