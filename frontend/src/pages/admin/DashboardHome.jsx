import { useState, useEffect } from 'react';
import settingsService from '../../services/settingsService';
import articleService from '../../services/articleService';
import eventService from '../../services/eventService';
import teamService from '../../services/teamService';
import {
    ToggleRight,
    ToggleLeft,
    Users,
    Loader2,
    FileText,
    Calendar,
    ClipboardList,
    TrendingUp,
    Activity,
    CheckCircle
} from 'lucide-react';

const DashboardHome = () => {
    const [stats, setStats] = useState({
        articles: 0,
        events: 0,
        team: 0,
        applications: 0
    });
    const [joinEnabled, setJoinEnabled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [toggling, setToggling] = useState(false);

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                const [statusRes, articlesRes, eventsRes, teamRes, appsRes] = await Promise.all([
                    settingsService.getJoinStatus(),
                    articleService.getAll(),
                    eventService.getAll(true), // isAdmin = true to get all
                    teamService.getAll(),
                    settingsService.getApplications()
                ]);

                setJoinEnabled(statusRes.enabled);
                setStats({
                    articles: articlesRes.data?.length || 0,
                    events: eventsRes.data?.length || 0,
                    team: teamRes.data?.length || 0,
                    applications: appsRes.data?.length || 0
                });
            } catch (err) {
                console.error('Failed to load dashboard data:', err);
            } finally {
                setLoading(false);
            }
        };
        loadDashboardData();
    }, []);

    const handleToggle = async () => {
        setToggling(true);
        try {
            const newVal = !joinEnabled;
            await settingsService.toggleJoinForm(newVal);
            setJoinEnabled(newVal);
        } catch (err) {
            alert('Failed to update form status');
        } finally {
            setToggling(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-10 h-10 text-blue-700 animate-spin" />
        </div>
    );

    const statCards = [
        { label: 'Total Articles', value: stats.articles, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Total Events', value: stats.events, icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Club Members', value: stats.team, icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Join Applications', value: stats.applications, icon: ClipboardList, color: 'text-amber-600', bg: 'bg-amber-50' },
    ];

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Statistics</h1>
                    <p className="text-slate-500 font-medium mt-1 uppercase text-xs tracking-[0.2em]">Live performance and activity overview</p>
                </div>

                {/* RECRUITMENT TOGGLE */}
                <div className={`flex items-center gap-4 p-2 pl-6 rounded-2xl border-2 transition-all shadow-sm ${joinEnabled ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">Recruitment Mode</span>
                        <span className={`text-sm font-black uppercase ${joinEnabled ? 'text-blue-700' : 'text-slate-500'}`}>
                            {joinEnabled ? 'Currently Active' : 'Form is Closed'}
                        </span>
                    </div>
                    <button
                        onClick={handleToggle}
                        disabled={toggling}
                        className={`p-2 rounded-xl transition-all ${joinEnabled ? 'text-blue-600 hover:bg-blue-100' : 'text-slate-400 hover:bg-slate-200'}`}
                    >
                        {toggling ? <Loader2 className="w-8 h-8 animate-spin" /> : (
                            joinEnabled ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10" />
                        )}
                    </button>
                </div>
            </div>

            {/* STATS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, i) => (
                    <div key={i} className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all group overflow-hidden relative">
                        <div className={`absolute top-0 right-0 w-32 h-32 ${card.bg} rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-700`}></div>
                        <div className="relative space-y-4">
                            <div className={`w-14 h-14 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center`}>
                                <card.icon className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">{card.label}</h3>
                                <p className="text-4xl font-black text-slate-900 mt-1">{card.value}</p>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                                <TrendingUp className="w-3 h-3" /> Live Update
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* SYSTEM HEALTH / RECENT ACTIVITY PLACEHOLDERS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
                    <div className="relative space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                                <Activity className="w-6 h-6 text-blue-400" />
                            </div>
                            <h3 className="text-2xl font-black tracking-tight uppercase">Platform Health</h3>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                            <div className="space-y-1">
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Database</p>
                                <p className="text-xl font-black flex items-center gap-2">Connected <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span></p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">API Status</p>
                                <p className="text-xl font-black flex items-center gap-2">Online <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span></p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Storage</p>
                                <p className="text-xl font-black">Cloudinary OK</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-600 rounded-[40px] p-10 text-white flex flex-col justify-between group overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
                    <div className="relative">
                        <CheckCircle className="w-12 h-12 mb-6 text-blue-200" />
                        <h3 className="text-2xl font-black leading-tight uppercase">Admin<br />Quick Tips</h3>
                        <p className="text-blue-100 text-sm mt-4 font-medium leading-relaxed">
                            Use the sidebar to manage all content. Remember to update event statuses regularly for your members.
                        </p>
                    </div>
                    <button className="relative mt-8 py-3 bg-white text-blue-700 font-black rounded-2xl uppercase text-[10px] tracking-widest hover:bg-blue-50 transition-all shadow-xl shadow-blue-900/20">
                        View Documentation
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
