import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        setIsOpen(false);
        if (isHomePage) {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const navLinks = [
        { name: 'Home', id: 'home', to: '/' },
        { name: 'About', id: 'about', to: '/#about' },
        { name: 'Events', id: 'events', to: '/#events' },
        { name: 'Resources', id: 'resources', to: '/#resources' },
        { name: 'Contact', id: 'contact', to: '/#contact' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 py-5'}`}>
            <div className="container mx-auto px-4 lg:px-12 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-700 flex items-center justify-center rounded-sm font-black text-white text-xl">
                        U
                    </div>
                    <span className="text-2xl font-bold text-blue-900 tracking-tight text-nowrap">UIT CLUB</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => scrollToSection(link.id)}
                            className="text-slate-600 font-semibold hover:text-blue-700 transition-colors uppercase text-sm tracking-wider"
                        >
                            {link.name}
                        </button>
                    ))}
                    <Link
                        to="/login"
                        className="ml-4 px-5 py-2 border-2 border-blue-700 text-blue-700 font-bold rounded hover:bg-blue-700 hover:text-white transition-all text-sm uppercase"
                    >
                        Members
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden p-2 text-blue-900"
                >
                    {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 top-[72px] bg-white z-40 lg:hidden transition-all duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col p-8 gap-6">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => scrollToSection(link.id)}
                            className="text-2xl font-bold text-slate-800 text-left border-b border-gray-100 pb-4"
                        >
                            {link.name}
                        </button>
                    ))}
                    <Link to="/login" className="mt-4 text-center py-4 bg-blue-700 text-white font-bold rounded shadow-lg">
                        Member Portal
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
