import { useState, useEffect } from 'react';
import eventService from '../services/eventService';
import EventCard from '../components/EventCard';
import { Loader2 } from 'lucide-react';

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
        <div className="space-y-10 max-w-5xl mx-auto">
            <header className="text-center space-y-4 mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                    Upcoming <span className="text-blue-600">Events</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Join us for our upcoming workshops, meetups, and conferences.
                </p>
            </header>

            <div className="flex flex-col gap-6">
                {events.length > 0 ? (
                    events.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))
                ) : (
                    <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        <p className="text-gray-500 text-lg">No upcoming events scheduled at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Events;
