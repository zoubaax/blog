import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import eventService from '../../services/eventService';
import { Plus, Trash2, Calendar, MapPin, Loader2, Users, Edit2, Eye, EyeOff } from 'lucide-react';

const AdminEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        try {
            const res = await eventService.getAll();
            setEvents(res.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await eventService.delete(id);
                setEvents(events.filter(e => e.id !== id));
            } catch (error) {
                alert('Failed to delete event');
            }
        }
    };

    const toggleVisibility = async (event) => {
        try {
            const updated = await eventService.update(event.id, { is_hidden: !event.is_hidden });
            setEvents(events.map(e => e.id === event.id ? { ...e, is_hidden: updated.data.is_hidden } : e));
        } catch (error) {
            alert('Failed to update visibility');
        }
    };

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-blue-600" /></div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Manage Events</h1>
                <NavLink to="/dashboard/events/new" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                    <Plus className="w-4 h-4" /> Add Event
                </NavLink>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <div key={event.id} className={`bg-white p-6 rounded-2xl shadow-sm border transition-all duration-300 relative group flex flex-col ${event.is_hidden ? 'border-gray-200 opacity-75 grayscale-[0.5]' : 'border-gray-100 hover:shadow-xl'}`}>
                        {/* Status Badge */}
                        <div className="flex justify-between items-start mb-4">
                            <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${event.is_hidden ? 'bg-gray-100 text-gray-500' : 'bg-green-50 text-green-600'}`}>
                                {event.is_hidden ? 'Hidden' : 'Visible'}
                            </div>
                            <div className="flex gap-1">
                                <button
                                    onClick={() => toggleVisibility(event)}
                                    className={`p-2 rounded-full transition-colors ${event.is_hidden ? 'text-gray-400 hover:bg-gray-100' : 'text-blue-500 hover:bg-blue-50'}`}
                                    title={event.is_hidden ? "Show Event" : "Hide Event"}
                                >
                                    {event.is_hidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                                <NavLink
                                    to={`/dashboard/events/edit/${event.id}`}
                                    className="p-2 text-amber-500 hover:bg-amber-50 rounded-full transition-colors"
                                    title="Edit Event"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </NavLink>
                                <button
                                    onClick={() => handleDelete(event.id)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                    title="Delete Event"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <h3 className="font-bold text-gray-900 text-xl mb-2 group-hover:text-blue-600 transition-colors">{event.title}</h3>

                        <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                <Calendar className="w-4 h-4 text-blue-500" />
                                <span>{new Date(event.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                <MapPin className="w-4 h-4 text-red-500" />
                                <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                <Users className="w-4 h-4 text-purple-500" />
                                <span>{event.current_registrations || 0} {event.max_participants ? `/ ${event.max_participants}` : ''} registered</span>
                            </div>
                        </div>

                        <p className="text-gray-600 text-sm line-clamp-2 mb-6 h-10">
                            {event.description}
                        </p>

                        <NavLink
                            to={`/dashboard/events/${event.id}/registrations`}
                            className="mt-auto flex items-center justify-center gap-2 w-full py-3 bg-blue-50 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-600 hover:text-white transition-all transform active:scale-95"
                        >
                            <Users className="w-4 h-4" /> View Participants
                        </NavLink>
                    </div>
                ))}
            </div>

            {events.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                    <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-8 h-8" />
                    </div>
                    <p className="text-gray-500 font-medium text-lg">No events found. Start by creating your first event!</p>
                </div>
            )}
        </div>
    );
};

export default AdminEvents;
