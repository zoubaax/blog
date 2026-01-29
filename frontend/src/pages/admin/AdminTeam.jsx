import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import teamService from '../../services/teamService';
import { Plus, Trash2, Linkedin, Twitter, Globe, Loader2 } from 'lucide-react';

const AdminTeam = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMembers();
    }, []);

    const loadMembers = async () => {
        try {
            const res = await teamService.getAll();
            setMembers(res.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to remove this member?')) {
            try {
                await teamService.delete(id);
                setMembers(members.filter(m => m.id !== id));
            } catch (error) {
                alert('Failed to delete member');
            }
        }
    };

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-blue-600" /></div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Manage Team</h1>
                <NavLink to="/dashboard/team/new" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4" /> Add Member
                </NavLink>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {members.map((member) => (
                    <div key={member.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow relative group">
                        <button
                            onClick={() => handleDelete(member.id)}
                            className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity p-2"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 ring-2 ring-gray-100">
                            <img
                                src={member.photo_url || 'https://via.placeholder.com/150'}
                                alt={member.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <h3 className="font-bold text-gray-900">{member.name}</h3>
                        <p className="text-blue-600 text-sm font-medium mb-3">{member.role}</p>

                        <div className="flex gap-2 text-gray-400">
                            {member.social_links?.linkedin && <Linkedin className="w-4 h-4" />}
                            {member.social_links?.twitter && <Twitter className="w-4 h-4" />}
                            {member.social_links?.website && <Globe className="w-4 h-4" />}
                        </div>
                    </div>
                ))}
            </div>

            {members.length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <p className="text-gray-500">No team members found.</p>
                </div>
            )}
        </div>
    );
};

export default AdminTeam;
