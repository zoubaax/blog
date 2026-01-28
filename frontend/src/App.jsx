import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Articles from './pages/Articles';
import Events from './pages/Events';
import Team from './pages/Team';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="articles" element={<Articles />} />
          <Route path="events" element={<Events />} />
          <Route path="team" element={<Team />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          {/* Add more routes here later */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
