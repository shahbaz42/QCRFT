import { Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import CraftForm from './pages/CraftForm';
import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route exact element={<PrivateRoute />}>
          <Route path='/craft' element={<CraftForm />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
