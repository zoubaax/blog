import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import DashboardHome from './pages/admin/DashboardHome';
import AdminArticles from './pages/admin/AdminArticles';
import Articles from './pages/Articles';
import Events from './pages/Events';
import Team from './pages/Team';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="articles" element={<Articles />} />
          <Route path="events" element={<Events />} />
          <Route path="team" element={<Team />} />
          <Route path="login" element={<Login />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<AdminLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="articles" element={<AdminArticles />} />
            <Route path="events" element={<div>Events Manager (Coming Soon)</div>} />
            <Route path="team" element={<div>Team Manager (Coming Soon)</div>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
