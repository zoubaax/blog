import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          {/* Add more routes here later */}
          {/* <Route path="articles" element={<Articles />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
