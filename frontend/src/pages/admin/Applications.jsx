import { useState, useEffect } from 'react';
import settingsService from '../../services/settingsService';
import { Mail, GraduationCap, Clock, Loader2, CheckCircle, AlertCircle, FileText } from 'lucide-react';

const Applications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApps = async () => {
            try {
                const res = await settingsService.getApplications();
                setApplications(res.data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchApps();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-10 h-10 text-blue-700 animate-spin" />
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Club Applications</h1>
                <p className="text-slate-500 font-medium mt-1 uppercase text-xs tracking-[0.2em]">Review and manage new membership requests</p>
            </div>

            <div className="bg-white rounded-[40px] shadow-xl border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                <th className="px-8 py-4">Applicant</th>
                                <th className="px-8 py-4">Major / Faculty</th>
                                <th className="px-8 py-4">Motivation</th>
                                <th className="px-8 py-4">Applied On</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {applications.map((app) => (
                                <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-sm uppercase">
                                                {app.full_name[0]}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-black text-slate-900 uppercase text-sm tracking-tight">{app.full_name}</span>
                                                <span className="text-xs text-slate-400 font-bold flex items-center gap-1"><Mail className="w-3 h-3" /> {app.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2 font-bold text-slate-600 text-sm">
                                            <GraduationCap className="w-4 h-4 text-blue-700" /> {app.major}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-xs text-slate-500 font-medium line-clamp-2 max-w-xs">{app.motivation}</p>
                                    </td>
                                    <td className="px-8 py-6 text-slate-400 text-xs font-bold">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-3.5 h-3.5" />
                                            {new Date(app.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {applications.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-8 py-20 text-center text-slate-400 font-bold uppercase tracking-widest">
                                        No applications received yet
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Applications;
