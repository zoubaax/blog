const Home = () => {
    return (
        <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
                Welcome to our <span className="text-blue-600">Platform</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                Discover amazing stories, join our upcoming events, and meet the team behind everything we do.
            </p>
            <div className="flex justify-center gap-4">
                <button className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
                    Read Blog
                </button>
                <button className="px-8 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    View Events
                </button>
            </div>
        </div>
    );
};

export default Home;
