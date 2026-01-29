import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import articleService from '../services/articleService';
import eventService from '../services/eventService';
import teamService from '../services/teamService';
import {
    Calendar,
    ChevronRight,
    BookOpen,
    Users,
    Target,
    MapPin,
    Mail,
    Globe,
    Award,
    Shield
} from 'lucide-react';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fade-in on scroll effect
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.fade-in-on-scroll');
        animatedElements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, [loading]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [eveRes, teamRes] = await Promise.all([
                    eventService.getAll(),
                    teamService.getAll()
                ]);
                setEvents(eveRes.data?.filter(e => !e.is_hidden).slice(0, 3) || []);
                setTeam(teamRes.data?.slice(0, 4) || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="flex flex-col w-full">

            {/* HERO SECTION */}
            <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                </div>
                <div className="container mx-auto px-4 text-center z-10 text-white space-y-8 animate-in fade-in zoom-in duration-1000">
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter">
                        [UIT] CLUB
                    </h1>
                    <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto text-blue-100 leading-relaxed">
                        Excellence in Innovation, Leadership, and Academic Achievement.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="px-10 py-4 bg-white text-blue-800 font-bold rounded shadow-xl hover:bg-blue-50 transition-all uppercase tracking-widest text-sm"
                        >
                            Join Now
                        </button>
                        <button
                            onClick={() => scrollToSection('events')}
                            className="px-10 py-4 border-2 border-white text-white font-bold rounded hover:bg-white/10 transition-all uppercase tracking-widest text-sm"
                        >
                            Upcoming Events
                        </button>
                    </div>
                </div>
            </section>

            {/* ABOUT SECTION */}
            <section id="about" className="py-24 bg-white fade-in-on-scroll">
                <div className="container mx-auto px-4 lg:px-12">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2 space-y-6">
                            <h2 className="section-title text-blue-900">About UIT Club</h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                UIT is a premier academic club dedicated to fostering professional growth,
                                technical excellence, and entrepreneurial spirit among students. We bridge
                                the gap between classroom theory and real-world application.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-50 text-blue-700 rounded-lg">
                                        <Target className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">Our Mission</h4>
                                        <p className="text-sm text-slate-500">To empower students through hands-on projects and mentorship.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-50 text-blue-700 rounded-lg">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">Focus Areas</h4>
                                        <p className="text-sm text-slate-500">Technology, Debate, and Professional Leadership.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-6">
                                <p className="text-slate-900 font-bold flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-blue-600" />
                                    Meeting Times: Every Tuesday & Thursday at 5:00 PM
                                </p>
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-gray-50">
                                <img
                                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200"
                                    alt="UIT Students"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* EVENTS SECTION */}
            <section id="events" className="py-24 bg-slate-50 fade-in-on-scroll">
                <div className="container mx-auto px-4 lg:px-12 text-center space-y-16">
                    <div className="space-y-4">
                        <h2 className="section-title text-blue-900 mx-auto w-fit font-black tracking-tight uppercase">Upcoming Activities</h2>
                        <p className="text-slate-500 max-w-xl mx-auto font-medium">Stay updated with our latest workshops, seminars, and networking events.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {events.length > 0 ? events.map(event => (
                            <div key={event.id} className="card p-8 flex flex-col items-start gap-6 text-left group">
                                <div className="w-full h-48 rounded-lg overflow-hidden relative">
                                    <img
                                        src={event.cover_image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800'}
                                        alt={event.title}
                                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4 bg-blue-700 text-white px-3 py-1 text-xs font-bold rounded uppercase tracking-widest leading-none">
                                        EVENT
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(event.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors uppercase leading-tight">{event.title}</h3>
                                    <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed">
                                        {event.description}
                                    </p>
                                </div>
                                <Link to={`/events/${event.id}`} className="mt-auto flex items-center gap-2 text-blue-700 font-bold hover:gap-4 transition-all uppercase text-xs tracking-widest">
                                    Learn More <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>
                        )) : (
                            <div className="col-span-3 py-10 text-slate-400 font-medium tracking-widest uppercase">No events scheduled at the moment.</div>
                        )}
                    </div>
                </div>
            </section>

            {/* RESOURCES SECTION */}
            <section id="resources" className="py-24 bg-white fade-in-on-scroll">
                <div className="container mx-auto px-4 lg:px-12 text-center space-y-16">
                    <div className="space-y-4">
                        <h2 className="section-title text-blue-900 mx-auto w-fit font-black tracking-tight uppercase">Club Resources</h2>
                        <p className="text-slate-500 max-w-xl mx-auto font-medium">We provide the tools and support needed for academic and professional success.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-blue-50 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-6">
                                <BookOpen className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Mentorship</h3>
                            <p className="text-slate-500 text-sm font-medium">Direct access to experienced upperclassmen and industry professionals.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-blue-50 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Award className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Toolkits</h3>
                            <p className="text-slate-500 text-sm font-medium">Curated digital resources, templates, and guides for your projects.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-blue-50 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Shield className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Member Portal</h3>
                            <p className="text-slate-500 text-sm font-medium">Exclusive dashboard for event registration and internal updates.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* TEAM SECTION */}
            <section id="team" className="py-24 bg-slate-50 fade-in-on-scroll">
                <div className="container mx-auto px-4 lg:px-12 text-center space-y-16">
                    <div className="space-y-4">
                        <h2 className="section-title text-blue-900 mx-auto w-fit font-black tracking-tight uppercase">Meet Our Leadership</h2>
                        <p className="text-slate-500 max-w-xl mx-auto font-medium">The dedicated students driving the vision of UIT Club forward.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {team.map(member => (
                            <div key={member.id} className="space-y-4 group">
                                <div className="w-48 h-48 rounded-full overflow-hidden mx-auto shadow-lg border-4 border-white group-hover:border-blue-100 transition-all duration-300 transform group-hover:scale-105">
                                    <img
                                        src={member.photo_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400'}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-xl font-bold text-slate-900 uppercase tracking-tight">{member.name}</h4>
                                    <p className="text-blue-600 font-bold text-xs tracking-[0.2em] uppercase">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-8">
                        <Link to="/team" className="btn-primary uppercase text-xs tracking-widest font-black">
                            See Full Team <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CONTACT SECTION */}
            <section id="contact" className="py-24 bg-white fade-in-on-scroll">
                <div className="container mx-auto px-4 lg:px-12">
                    <div className="flex flex-col lg:flex-row gap-16">
                        <div className="lg:w-1/2 space-y-8">
                            <h2 className="section-title text-blue-900 font-black tracking-tight uppercase">Get In Touch</h2>
                            <p className="text-slate-500 max-w-md font-medium">Interested in joining or partnership? Drop us a message or join our mailing list.</p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-slate-700 font-bold">
                                    <Mail className="w-5 h-5 text-blue-600" /> contact@uitclub.edu
                                </div>
                                <div className="flex items-center gap-4 text-slate-700 font-bold">
                                    <MapPin className="w-5 h-5 text-blue-600" /> Faculty of Sciences, Campus Nord
                                </div>
                                <div className="flex items-center gap-4 text-slate-700 font-bold">
                                    <Globe className="w-5 h-5 text-blue-600" /> www.uitclub.edu
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <a href="#" className="w-12 h-12 bg-blue-50 text-blue-700 rounded-full flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all">
                                    <Globe className="w-6 h-6" />
                                </a>
                                <a href="#" className="w-12 h-12 bg-blue-50 text-blue-700 rounded-full flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all">
                                    <Mail className="w-6 h-6" />
                                </a>
                            </div>
                        </div>

                        <div className="lg:w-1/2">
                            <form className="bg-slate-50 p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-700 uppercase tracking-widest">Full Name</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:ring-4 focus:ring-blue-100 transition-all font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-700 uppercase tracking-widest">Email Address</label>
                                        <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:ring-4 focus:ring-blue-100 transition-all font-bold" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-700 uppercase tracking-widest">Message</label>
                                    <textarea rows="5" className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:ring-4 focus:ring-blue-100 transition-all font-bold resize-none"></textarea>
                                </div>
                                <button type="button" className="w-full py-4 bg-blue-700 text-white font-black rounded shadow-lg hover:bg-blue-800 transition-all uppercase tracking-[0.2em] text-sm">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
