import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider } from './context/DataContext.jsx';
import Home from './pages/Home.jsx';
import AdminPage from './pages/AdminPage.jsx';

// HashRouter => "/" is the shop and "/#/admin" is the admin panel.
// Works on GitHub Pages with no 404 / server-rewrite setup.
export default function App() {
  return (
    <DataProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </DataProvider>
  );
}
