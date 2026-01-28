import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
    const eventDate = new Date(event.date);
    const day = eventDate.getDate();
    const month = eventDate.toLocaleString('default', { month: 'short' });
    const year = eventDate.getFullYear();

    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row transition-all duration-300 group">
            {/* Date Badge (Left Side or Top) */}
            <div className="md:w-24 bg-blue-50 flex flex-col items-center justify-center p-4 text-blue-600 border-b md:border-b-0 md:border-r border-blue-100 shrink-0">
                <span className="text-xl font-bold uppercase tracking-wider">{month}</span>
                <span className="text-3xl font-extrabold">{day}</span>
                <span className="text-sm font-medium opacity-80">{year}</span>
            </div>

            {/* Image (Middle) */}
            <div className="md:w-64 h-48 md:h-auto overflow-hidden relative shrink-0">
                <img
                    src={event.cover_image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}
                    alt={event.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Content (Right) */}
            <div className="flex-1 p-6 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{event.location}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {event.title}
                </h3>

                <p className="text-gray-600 text-sm line-clamp-2 md:line-clamp-2 mb-4">
                    {event.description}
                </p>

                {/* Optional: Add a "Register" or "Details" button logic */}
                <div className="mt-auto">
                    <Link to={`/events/${event.id}`} className="text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center">
                        View Details <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
