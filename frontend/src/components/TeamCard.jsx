import { Linkedin, Twitter, Globe, Mail, Sparkles } from 'lucide-react';

const TeamCard = ({ member }) => {
    const { name, role, photo_url, social_links, bio } = member;

    return (
        <div className="group relative bg-white rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100">
            {/* Gradient Background Header */}
            <div className="h-24 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
                <Sparkles className="absolute top-2 right-2 w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors" />
            </div>

            {/* Profile Image - Overlapping */}
            <div className="flex justify-center -mt-16 mb-4 px-6">
                <div className="relative">
                    <div className="w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-white shadow-xl transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-500">
                        <img
                            src={photo_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                            alt={name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Status Indicator */}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white shadow-lg" />
                </div>
            </div>

            {/* Content */}
            <div className="px-6 pb-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {name}
                </h3>
                <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full mb-4">
                    <p className="text-xs font-bold uppercase tracking-wider">{role}</p>
                </div>

                {/* Bio if available */}
                {bio && (
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                        {bio}
                    </p>
                )}

                {/* Social Links */}
                <div className="flex justify-center gap-2 pt-4 border-t border-gray-100">
                    {social_links?.linkedin && (
                        <a
                            href={social_links.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 text-gray-400 hover:text-white hover:bg-blue-600 rounded-xl transition-all duration-300 hover:scale-110"
                            title="LinkedIn"
                        >
                            <Linkedin className="w-4 h-4" />
                        </a>
                    )}
                    {social_links?.twitter && (
                        <a
                            href={social_links.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 text-gray-400 hover:text-white hover:bg-sky-500 rounded-xl transition-all duration-300 hover:scale-110"
                            title="Twitter"
                        >
                            <Twitter className="w-4 h-4" />
                        </a>
                    )}
                    {social_links?.website && (
                        <a
                            href={social_links.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 text-gray-400 hover:text-white hover:bg-purple-600 rounded-xl transition-all duration-300 hover:scale-110"
                            title="Website"
                        >
                            <Globe className="w-4 h-4" />
                        </a>
                    )}
                    {member.email && (
                        <a
                            href={`mailto:${member.email}`}
                            className="p-2.5 text-gray-400 hover:text-white hover:bg-red-500 rounded-xl transition-all duration-300 hover:scale-110"
                            title="Email"
                        >
                            <Mail className="w-4 h-4" />
                        </a>
                    )}
                </div>
            </div>

            {/* Decorative Corner Accent */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-br-full" />
        </div>
    );
};

export default TeamCard;
