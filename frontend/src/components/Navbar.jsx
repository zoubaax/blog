import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-sm border-b border-gray-100">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold text-blue-600">
                    BlogPlatform
                </Link>

                <div className="flex gap-6">
                    <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
                    <Link to="/articles" className="hover:text-blue-600 transition-colors">Articles</Link>
                    <Link to="/events" className="hover:text-blue-600 transition-colors">Events</Link>
                    <Link to="/team" className="hover:text-blue-600 transition-colors">Team</Link>
                </div>

                <div className="flex gap-4">
                    <Link to="/login" className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
