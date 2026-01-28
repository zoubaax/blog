
const DashboardHome = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Total Articles</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Upcoming Events</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">4</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Team Members</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">8</p>
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                <h3 className="text-blue-800 font-semibold mb-2">Welcome to your dashboard</h3>
                <p className="text-blue-600 text-sm">Select a module from the sidebar to manage your content.</p>
            </div>
        </div>
    );
};

export default DashboardHome;
