import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import eventService from '../../services/eventService';
import ImageUpload from '../../components/ImageUpload';
import { Save, ArrowLeft, Loader2, Calendar, MapPin, Users, Clock } from 'lucide-react';

const CreateEvent = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        cover_image_url: '',
        registration_deadline: '',
        max_participants: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Prepare data: convert empty string to null for optional numbers
        const submitData = {
            ...formData,
            max_participants: formData.max_participants === '' ? null : parseInt(formData.max_participants),
            registration_deadline: formData.registration_deadline === '' ? null : formData.registration_deadline
        };

        try {
            await eventService.create(submitData);
            navigate('/dashboard/events');
        } catch (error) {
            alert('Failed to create event');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6 pb-20">
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navigate('/dashboard/events')}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Create New Event</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700">Event Title</label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                        placeholder="e.g., Tech Workshop 2024"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-blue-500" /> Event Date & Time
                        </label>
                        <input
                            type="datetime-local"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-red-500" /> Location
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                            placeholder="e.g., Main Hall / Online"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                    </div>
                </div>

                {/* New Limit Fields */}
                <div className="p-6 bg-blue-50/50 rounded-2xl space-y-6 border border-blue-100">
                    <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider flex items-center gap-2">
                        Registration Limits <span className="text-[10px] font-normal text-blue-500 normal-case">(Optional)</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 flex items-center gap-2">
                                <Clock className="w-4 h-4 text-amber-500" /> Registration Deadline
                            </label>
                            <input
                                type="datetime-local"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all bg-white"
                                value={formData.registration_deadline}
                                onChange={(e) => setFormData({ ...formData, registration_deadline: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 flex items-center gap-2">
                                <Users className="w-4 h-4 text-purple-500" /> Max Participants
                            </label>
                            <input
                                type="number"
                                min="1"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all bg-white"
                                placeholder="Unlimted"
                                value={formData.max_participants}
                                onChange={(e) => setFormData({ ...formData, max_participants: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <ImageUpload
                    onImageUpload={(url) => setFormData({ ...formData, cover_image_url: url })}
                />

                <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700">Description</label>
                    <textarea
                        required
                        rows="6"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all resize-none"
                        placeholder="Describe the event..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-70 disabled:scale-95"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        Create Event
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateEvent;
