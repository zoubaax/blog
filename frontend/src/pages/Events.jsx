import { useState, useEffect } from 'react';
import eventService from '../services/eventService';
import EventCard from '../components/EventCard';
import { Loader2, Calendar, Sparkles, Zap } from 'lucide-react';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await eventService.getAll();
                setEvents(response.data || []);
            } catch (err) {
                setError('Failed to load events. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                <p className="text-gray-600 font-medium">Loading events...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-4">
                    <Calendar className="w-8 h-8 text-red-500" />
                </div>
                <p className="text-red-600 font-semibold">{error}</p>
            </div>
        );
    }

    const upcomingEvents = events.filter(e => new Date(e.date) > new Date());
    const pastEvents = events.filter(e => new Date(e.date) <= new Date());

    return (
        <div className="space-y-16 py-8 max-w-6xl mx-auto">
            {/* Animated Header */}
            <header className="relative text-center space-y-6 px-4">
                {/* Decorative Elements */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-30 animate-pulse" />

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100 rounded-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <Zap className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-bold text-purple-700 uppercase tracking-wider">Events Calendar</span>
                </div>

                {/* Main Title */}
                <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                    Upcoming <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Events</span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                    Join us for workshops, meetups, hackathons, and conferences designed to inspire and connect our community.
                </p>

                {/* Stats */}
                <div className="flex items-center justify-center gap-8 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                    <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-5 h-5 text-blue-500" />
                        <span className="font-semibold">{upcomingEvents.length} Upcoming</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full" />
                    <div className="text-gray-600">
                        <span className="font-semibold">{events.length} Total Events</span>
                    </div>
                </div>

                {/* Decorative Line */}
                <div className="flex items-center justify-center gap-4 pt-6">
                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-gray-300" />
                    <div className="w-2 h-2 bg-purple-600 rounded-full" />
                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-gray-300" />
                </div>
            </header>

            {/* Events List */}
            {events.length > 0 ? (
                <div className="space-y-12">
                    {/* Upcoming Events */}
                    {upcomingEvents.length > 0 && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <Sparkles className="w-6 h-6 text-emerald-500" />
                                <h2 className="text-2xl font-bold text-gray-900">Coming Soon</h2>
                                <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
                            </div>
                            <div className="flex flex-col gap-6">
                                {upcomingEvents.map((event, index) => (
                                    <div
                                        key={event.id}
                                        className="animate-in fade-in slide-in-from-bottom-4 duration-700"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <EventCard event={event} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Past Events */}
                    {pastEvents.length > 0 && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <Calendar className="w-6 h-6 text-gray-400" />
                                <h2 className="text-2xl font-bold text-gray-900">Past Events</h2>
                                <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
                            </div>
                            <div className="flex flex-col gap-6 opacity-75">
                                {pastEvents.map((event, index) => (
                                    <div
                                        key={event.id}
                                        className="animate-in fade-in slide-in-from-bottom-4 duration-700"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <EventCard event={event} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center py-20 bg-gradient-to-br from-gray-50 to-purple-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Calendar className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Events Scheduled</h3>
                    <p className="text-gray-500 text-lg">Stay tuned for exciting upcoming events!</p>
                </div>
            )}
        </div>
    );
};

export default Events;
