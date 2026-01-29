import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import eventService from '../../services/eventService';
import { Plus, Trash2, Calendar, MapPin, Loader2, Users } from 'lucide-react';

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

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-blue-600" /></div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Manage Events</h1>
                <NavLink to="/dashboard/events/new" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4" /> Add Event
                </NavLink>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <div key={event.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                                {new Date(event.date).toLocaleDateString()}
                            </div>
                            <button onClick={() => handleDelete(event.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>

                        <h3 className="font-bold text-gray-900 text-lg mb-2">{event.title}</h3>

                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                        </div>

                        <p className="text-gray-600 text-sm line-clamp-2 mt-auto mb-4">
                            {event.description}
                        </p>

                        <NavLink
                            to={`/dashboard/events/${event.id}/registrations`}
                            className="flex items-center justify-center gap-2 w-full py-2 bg-gray-50 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors"
                        >
                            <Users className="w-4 h-4" /> View Participants
                        </NavLink>
                    </div>
                ))}
            </div>

            {events.length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <p className="text-gray-500">No events found. Create your first one!</p>
                </div>
            )}
        </div>
    );
};

export default AdminEvents;
