import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import eventService from '../services/eventService';
import { Calendar, MapPin, ArrowLeft, Loader2 } from 'lucide-react';
import EventRegistrationForm from '../components/EventRegistrationForm';

const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await eventService.getById(id);
                setEvent(response.data);
            } catch (err) {
                setError('Event not found or failed to load.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
                <p className="text-red-600 text-lg">{error || 'Something went wrong'}</p>
                <button onClick={() => navigate('/events')} className="text-blue-600 font-medium hover:underline">Go back to events</button>
            </div>
        );
    }

    const eventDate = new Date(event.date);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <button
                onClick={() => navigate('/events')}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-8 group"
            >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to Events
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left side: Information */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="rounded-3xl overflow-hidden shadow-2xl h-[400px]">
                        <img
                            src={event.cover_image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'}
                            alt={event.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                            {event.title}
                        </h1>

                        <div className="flex flex-wrap gap-6 text-gray-600 font-medium">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-blue-600" />
                                <span>{eventDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-blue-600" />
                                <span>{event.location}</span>
                            </div>
                        </div>
                    </div>

                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">About the Event</h2>
                        <p className="whitespace-pre-line">{event.description}</p>
                    </div>
                </div>

                {/* Right side: Form */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24">
                        <EventRegistrationForm eventId={event.id} eventTitle={event.title} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetail;
