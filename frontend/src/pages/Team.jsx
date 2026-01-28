import { useState, useEffect } from 'react';
import teamService from '../services/teamService';
import TeamCard from '../components/TeamCard';
import { Loader2 } from 'lucide-react';

const Team = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await teamService.getAll();
                setMembers(response.data || []);
            } catch (err) {
                setError('Failed to load team members. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
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
        <div className="space-y-12 max-w-6xl mx-auto">
            <header className="text-center space-y-4 max-w-2xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                    Meet Our <span className="text-blue-600">Team</span>
                </h1>
                <p className="text-lg text-gray-600">
                    The talented individuals working hard to bring you the best content and experiences.
                </p>
            </header>

            {members.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {members.map((member) => (
                        <TeamCard key={member.id} member={member} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <p className="text-gray-500">No team members found.</p>
                </div>
            )}
        </div>
    );
};

export default Team;
