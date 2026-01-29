import { Link } from 'react-router-dom';
import { Mail, MapPin, Globe, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-slate-900 text-white pt-20 pb-10">
            <div className="container mx-auto px-4 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                    {/* Brand Section */}
                    <div className="col-span-1 lg:col-span-1 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white flex items-center justify-center rounded-sm font-black text-blue-900 text-xl">
                                U
                            </div>
                            <span className="text-2xl font-bold tracking-tight">UIT CLUB</span>
                        </div>
                        <p className="text-slate-400 font-medium leading-relaxed max-w-xs">
                            Dedicated to academic excellence and student professional leadership within our university community.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-700 transition-all">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-white font-bold uppercase tracking-widest text-sm">Navigation</h4>
                        <ul className="flex flex-col gap-4 text-slate-400 font-bold">
                            <li><button onClick={scrollToTop} className="hover:text-white transition-colors text-left uppercase text-xs tracking-widest">Home</button></li>
                            <li><Link to="/#about" className="hover:text-white transition-colors uppercase text-xs tracking-widest">About Us</Link></li>
                            <li><Link to="/#events" className="hover:text-white transition-colors uppercase text-xs tracking-widest">Upcoming Events</Link></li>
                            <li><Link to="/#resources" className="hover:text-white transition-colors uppercase text-xs tracking-widest">Resources</Link></li>
                            <li><Link to="/#team" className="hover:text-white transition-colors uppercase text-xs tracking-widest">Leadership</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h4 className="text-white font-bold uppercase tracking-widest text-sm">Meeting Info</h4>
                        <div className="flex flex-col gap-4 text-slate-400 font-bold text-sm">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-blue-500 shrink-0" />
                                <span>Building A, Room 302<br />University Main Campus</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                                <span>contact@uitclub.edu</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Globe className="w-5 h-5 text-blue-500 shrink-0" />
                                <span>Tuesday & Thursday, 5 PM</span>
                            </div>
                        </div>
                    </div>

                    {/* University Logo Placeholder */}
                    <div className="space-y-6">
                        <h4 className="text-white font-bold uppercase tracking-widest text-sm">In Affiliation With</h4>
                        <div className="w-full h-24 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 opacity-50 border-dashed">
                            <span className="text-slate-500 font-bold tracking-widest uppercase">UNIVERSITY LOGO</span>
                        </div>
                        <p className="text-xs text-slate-500 italic">Official student organization recognized by the Academic Affairs.</p>
                    </div>
                </div>

                <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
                    <p>&copy; {new Date().getFullYear()} UIT CLUB. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link to="/login" className="hover:text-blue-50 transition-colors">Member Portal Login</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
