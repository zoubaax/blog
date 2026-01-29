import { Calendar, MapPin, ArrowRight, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
    const eventDate = new Date(event.date);
    const day = eventDate.getDate();
    const month = eventDate.toLocaleString('default', { month: 'short' });
    const year = eventDate.getFullYear();
    const time = eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const isUpcoming = eventDate > new Date();
    const spotsLeft = event.max_participants ? event.max_participants - (event.current_registrations || 0) : null;

    return (
        <div className="group relative bg-white rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 border border-gray-100">
            <div className="flex flex-col md:flex-row">
                {/* Date Badge */}
                <div className="md:w-32 bg-gradient-to-br from-blue-600 to-blue-700 flex flex-col items-center justify-center p-6 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
                    <div className="relative z-10 text-center">
                        <span className="text-sm font-bold uppercase tracking-widest opacity-90">{month}</span>
                        <div className="text-5xl font-black my-1">{day}</div>
                        <span className="text-xs font-semibold opacity-80">{year}</span>
                    </div>
                </div>

                {/* Image */}
                <div className="md:w-80 h-56 md:h-auto overflow-hidden relative">
                    <img
                        src={event.cover_image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}
                        alt={event.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                    {/* Status Badge */}
                    {isUpcoming && (
                        <div className="absolute top-4 left-4">
                            <div className="px-3 py-1.5 bg-emerald-500 text-white rounded-full shadow-lg backdrop-blur-sm">
                                <span className="text-xs font-bold uppercase tracking-wider">Upcoming</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 p-8 flex flex-col justify-between">
                    <div>
                        {/* Location & Time */}
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <MapPin className="w-4 h-4 text-red-500" />
                                <span className="font-medium">{event.location}</span>
                            </div>
                            <span className="text-gray-300">•</span>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock className="w-4 h-4 text-blue-500" />
                                <span className="font-medium">{time}</span>
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                            {event.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
                            {event.description}
                        </p>

                        {/* Participants Info */}
                        {event.max_participants > 0 && (
                            <div className="flex items-center gap-2 mb-6">
                                <Users className="w-4 h-4 text-purple-500" />
                                <span className="text-sm font-medium text-gray-700">
                                    {event.current_registrations || 0} / {event.max_participants} registered
                                </span>
                                {spotsLeft !== null && spotsLeft > 0 && spotsLeft <= 10 && (
                                    <span className="ml-2 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">
                                        {spotsLeft} spots left
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Action Button */}
                    <div>
                        <Link
                            to={`/events/${event.id}`}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 hover:gap-3 group/btn shadow-lg shadow-blue-200"
                        >
                            <span>{isUpcoming ? 'Register Now' : 'View Details'}</span>
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Decorative Accent */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tl-full" />
        </div>
    );
};

export default EventCard;
