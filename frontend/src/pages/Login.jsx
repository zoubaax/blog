import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(''); // Clear error on typing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (!formData.email || !formData.password) {
                throw new Error('Please fill in all fields'); // Local validation
            }
            await authService.login(formData.email, formData.password);

            // Redirect to dashboard or home
            navigate('/dashboard');
        } catch (err) {
            setError(err || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-8 space-y-8">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome Back</h2>
                    <p className="text-gray-500 text-sm">Sign in to access your admin dashboard</p>
                </div>

                {error && (
                    <div className="flex items-center gap-2 p-4 text-sm text-red-700 bg-red-50 rounded-lg border border-red-100 animate-in fade-in slide-in-from-top-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 block" htmlFor="email">
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 pl-11 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-colors bg-gray-50 focus:bg-white outline-none"
                                placeholder="name@example.com"
                                required
                            />
                            <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 block" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 pl-11 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-colors bg-gray-50 focus:bg-white outline-none"
                                placeholder="••••••••"
                                required
                            />
                            <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>

                    <div className="text-center text-sm text-gray-500">
                        <span>Restricted area. Authorized personnel only.</span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
