import { useState } from 'react';
import { User, Mail, Phone, School, CheckCircle, Loader2, AlertCircle, Users, Clock } from 'lucide-react';
import registrationService from '../services/registrationService';

const EventRegistrationForm = ({ eventId, eventTitle, isDeadlinePassed, isFull }) => {
    const isDisabled = isDeadlinePassed || isFull;
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        school_name: '',
        agreed_to_policies: false
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isDisabled) return;

        setLoading(true);
        setError('');

        try {
            await registrationService.register({
                event_id: eventId,
                ...formData
            });
            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to register. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (isDeadlinePassed) {
        return (
            <div className="bg-amber-50 border border-amber-100 p-8 rounded-2xl text-center space-y-4">
                <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
                    <Clock className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Registration Closed</h3>
                <p className="text-amber-700 text-sm">
                    The registration deadline for this event has passed. We hope to see you at our next event!
                </p>
            </div>
        );
    }

    if (isFull) {
        return (
            <div className="bg-red-50 border border-red-100 p-8 rounded-2xl text-center space-y-4">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
                    <Users className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Event is Full</h3>
                <p className="text-red-700 text-sm">
                    Maximum capacity reached! All registration slots for this event have been filled.
                </p>
            </div>
        );
    }

    if (success) {
        return (
            <div className="bg-green-50 border border-green-100 p-8 rounded-2xl text-center space-y-4 shadow-lg shadow-green-100/50">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Registration Successful!</h3>
                <p className="text-gray-600">
                    Thank you, <span className="font-semibold">{formData.full_name}</span>. You're all set for <span className="font-semibold">{eventTitle}</span>.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Register for Event</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 block">Full Name *</label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            name="full_name"
                            type="text"
                            required
                            placeholder="Your Name"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all"
                            value={formData.full_name}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 block">Email Address *</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            name="email"
                            type="email"
                            required
                            placeholder="email@example.com"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 block">Phone Number</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                name="phone"
                                type="tel"
                                placeholder="+212 6xx xxx xxx"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 block">School / University</label>
                        <div className="relative">
                            <School className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                name="school_name"
                                type="text"
                                placeholder="Your University"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all"
                                value={formData.school_name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-start gap-3 py-2">
                    <input
                        name="agreed_to_policies"
                        type="checkbox"
                        required
                        id="terms"
                        className="mt-1 w-5 h-5 text-blue-600 rounded-lg border-gray-300 focus:ring-blue-500 cursor-pointer"
                        checked={formData.agreed_to_policies}
                        onChange={handleChange}
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed cursor-pointer select-none">
                        I agree to the <span className="text-blue-600 font-bold hover:underline">policies</span>.
                    </label>
                </div>

                {error && (
                    <div className="text-red-500 text-sm font-bold bg-red-50 p-4 rounded-xl border border-red-100 flex gap-2">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                    {loading ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                        "Confirm Registration"
                    )}
                </button>
            </form>
        </div>
    );
};

export default EventRegistrationForm;
