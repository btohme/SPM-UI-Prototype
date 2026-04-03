import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import ProjectsLanding from './pages/ProjectsLanding';
import InitiativesLanding from './pages/InitiativesLanding';
import StrategiesLanding from './pages/StrategiesLanding';
import ListingPage from './pages/ListingPage';
import AddPage from './pages/AddPage';
import ViewPage from './pages/ViewPage';
import EditPage from './pages/EditPage';
import ProjectWorkspace from './pages/ProjectWorkspace';
import InitiativeWorkspace from './pages/InitiativeWorkspace';

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<ProjectsLanding />} />
          <Route path="/initiatives" element={<InitiativesLanding />} />
          <Route path="/strategies" element={<StrategiesLanding />} />
          <Route path="/list" element={<ListingPage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/view" element={<ViewPage />} />
          <Route path="/edit" element={<EditPage />} />
          <Route path="/workspace/project" element={<ProjectWorkspace />} />
          <Route path="/workspace/initiative" element={<InitiativeWorkspace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}
