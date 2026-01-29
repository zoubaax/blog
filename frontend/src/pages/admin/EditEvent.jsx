import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import eventService from '../../services/eventService';
import ImageUpload from '../../components/ImageUpload';
import { Save, ArrowLeft, Loader2, Calendar, MapPin, Eye, EyeOff, Clock, Users } from 'lucide-react';

const EditEvent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        cover_image_url: '',
        is_hidden: false,
        registration_deadline: '',
        max_participants: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await eventService.getById(id);
                const event = res.data;

                // Format dates for datetime-local input
                const formatDate = (isoStr) => {
                    if (!isoStr) return '';
                    const date = new Date(isoStr);
                    return date.toISOString().slice(0, 16);
                };

                setFormData({
                    title: event.title,
                    description: event.description,
                    date: formatDate(event.date),
                    location: event.location,
                    cover_image_url: event.cover_image_url,
                    is_hidden: event.is_hidden,
                    registration_deadline: formatDate(event.registration_deadline),
                    max_participants: event.max_participants || ''
                });
            } catch (error) {
                alert('Failed to fetch event data');
                navigate('/dashboard/events');
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        const submitData = {
            ...formData,
            max_participants: formData.max_participants === '' ? null : parseInt(formData.max_participants),
            registration_deadline: formData.registration_deadline === '' ? null : formData.registration_deadline
        };

        try {
            await eventService.update(id, submitData);
            navigate('/dashboard/events');
        } catch (error) {
            alert('Failed to update event');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            <p className="text-gray-500 font-medium">Loading event details...</p>
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto space-y-6 pb-20">
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navigate('/dashboard/events')}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Edit Event</h1>
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
                            <Calendar className="w-4 h-4 text-blue-500" /> Date & Time
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

                {/* Limit Fields */}
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

                <div className="p-4 bg-gray-50 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {formData.is_hidden ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-green-600" />}
                            <div>
                                <p className="text-sm font-bold text-gray-900">Visibility</p>
                                <p className="text-xs text-gray-500">{formData.is_hidden ? 'This event is hidden from the public' : 'This event is visible to everyone'}</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, is_hidden: !formData.is_hidden })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ring-2 ring-offset-2 ring-transparent ${formData.is_hidden ? 'bg-gray-300' : 'bg-blue-600'}`}
                        >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.is_hidden ? 'translate-x-1' : 'translate-x-6'}`} />
                        </button>
                    </div>
                </div>

                <ImageUpload
                    initialImage={formData.cover_image_url}
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

                <div className="flex justify-end pt-4 border-t gap-3">
                    <button
                        type="button"
                        onClick={() => navigate('/dashboard/events')}
                        className="px-6 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-70 disabled:scale-95"
                    >
                        {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditEvent;
