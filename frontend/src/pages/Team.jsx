import { useState, useEffect } from 'react';
import teamService from '../services/teamService';
import TeamCard from '../components/TeamCard';
import { Loader2, Users } from 'lucide-react';

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
                <Loader2 className="w-12 h-12 text-blue-700 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
                <div className="p-4 bg-red-50 text-red-600 rounded-full">
                    <Users className="w-12 h-12" />
                </div>
                <p className="text-red-600 font-bold">{error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-20 max-w-7xl mx-auto px-4 lg:px-12 py-12">
            <header className="text-center space-y-6 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-bold uppercase tracking-widest">
                    <Users className="w-4 h-4" /> Leadership Board
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight uppercase">
                    Our <span className="text-blue-700">Dedication</span> Drives Us
                </h1>
                <p className="text-xl text-slate-500 leading-relaxed">
                    The talented students committed to academic excellence and
                    community growth at [UIT] Club.
                </p>
                <div className="w-24 h-2 bg-blue-700 mx-auto rounded-full"></div>
            </header>

            {members.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {members.map((member) => (
                        <TeamCard key={member.id} member={member} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 bg-slate-50 rounded-[40px] border-2 border-dashed border-gray-200">
                    <p className="text-slate-400 font-bold text-xl uppercase tracking-widest">No leadership data found.</p>
                </div>
            )}
        </div>
    );
};

export default Team;
