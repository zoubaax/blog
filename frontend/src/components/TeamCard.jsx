import { Linkedin, Twitter, Globe, Mail } from 'lucide-react';

const TeamCard = ({ member }) => {
    const { name, role, photo_url, social_links } = member;

    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden text-center p-6 transition-all duration-300 group">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 ring-4 ring-gray-50 group-hover:ring-blue-50 transition-all">
                <img
                    src={photo_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                    alt={name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
            <p className="text-blue-600 font-medium text-sm mb-4 uppercase tracking-wide">{role}</p>

            <div className="flex justify-center gap-3">
                {social_links?.linkedin && (
                    <a href={social_links.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                        <Linkedin className="w-5 h-5" />
                    </a>
                )}
                {social_links?.twitter && (
                    <a href={social_links.twitter} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-50 rounded-full transition-colors">
                        <Twitter className="w-5 h-5" />
                    </a>
                )}
                {social_links?.website && (
                    <a href={social_links.website} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                        <Globe className="w-5 h-5" />
                    </a>
                )}
                {/* Fallback or generic contact if needed */}
            </div>
        </div>
    );
};

export default TeamCard;
