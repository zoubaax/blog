import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import teamService from '../../services/teamService';
import ImageUpload from '../../components/ImageUpload';
import { Save, ArrowLeft, Loader2, Linkedin, Twitter, Globe } from 'lucide-react';

const CreateTeam = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        photo_url: '',
        social_links: {
            linkedin: '',
            twitter: '',
            website: ''
        }
    });
    const [loading, setLoading] = useState(false);

    const handleSocialChange = (e) => {
        setFormData({
            ...formData,
            social_links: {
                ...formData.social_links,
                [e.target.name]: e.target.value
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await teamService.create(formData);
            navigate('/dashboard/team');
        } catch (error) {
            alert('Failed to add team member');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navigate('/dashboard/team')}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Add Team Member</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                            placeholder="e.g., Jane Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Role / Position</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                            placeholder="e.g., President"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        />
                    </div>
                </div>

                <ImageUpload
                    onImageUpload={(url) => setFormData({ ...formData, photo_url: url })}
                />

                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-900 border-b pb-2">Social Links (Optional)</h3>

                    <div className="flex items-center gap-3">
                        <Linkedin className="w-5 h-5 text-blue-600 shrink-0" />
                        <input
                            type="url"
                            name="linkedin"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm"
                            placeholder="LinkedIn Profile URL"
                            value={formData.social_links.linkedin}
                            onChange={handleSocialChange}
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <Twitter className="w-5 h-5 text-blue-400 shrink-0" />
                        <input
                            type="url"
                            name="twitter"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm"
                            placeholder="Twitter Profile URL"
                            value={formData.social_links.twitter}
                            onChange={handleSocialChange}
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-gray-600 shrink-0" />
                        <input
                            type="url"
                            name="website"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm"
                            placeholder="Personal Website URL"
                            value={formData.social_links.website}
                            onChange={handleSocialChange}
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-70"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Member
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateTeam;
