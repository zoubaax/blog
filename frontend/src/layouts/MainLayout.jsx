import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 overflow-x-hidden">
            <Navbar />
            <main className="flex-grow pt-24 pb-20">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
