import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import eventService from '../services/eventService';
import { Calendar, MapPin, ArrowLeft, Loader2, Clock, Users } from 'lucide-react';
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
    const deadline = event.registration_deadline ? new Date(event.registration_deadline) : null;
    const isDeadlinePassed = deadline && new Date() > deadline;

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

                    <div className="space-y-6">
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                            {event.title}
                        </h1>

                        <div className="flex flex-wrap gap-8 text-gray-600 font-medium">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Date & Time</span>
                                    <span>{eventDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Location</span>
                                    <span>{event.location}</span>
                                </div>
                            </div>
                            {event.max_participants && (
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Capacity</span>
                                        <span>Max {event.max_participants} people</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-50 pb-4">Event Description</h2>
                        <p className="whitespace-pre-line">{event.description}</p>
                    </div>
                </div>

                {/* Right side: Form */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-6">
                        {deadline && (
                            <div className={`p-4 rounded-2xl border flex items-center gap-3 ${isDeadlinePassed ? 'bg-red-50 border-red-100 text-red-700' : 'bg-amber-50 border-amber-100 text-amber-700'}`}>
                                <Clock className="w-5 h-5" />
                                <div className="text-sm">
                                    <p className="font-bold">Registration Deadline</p>
                                    <p>{deadline.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}</p>
                                </div>
                            </div>
                        )}

                        <EventRegistrationForm
                            eventId={event.id}
                            eventTitle={event.title}
                            isDisabled={isDeadlinePassed}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetail;
