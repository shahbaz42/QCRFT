import { Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import CraftForm from './pages/CraftForm' ;

function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/craft' element={<CraftForm/>} />
    </Routes>
  );
}

export default App;
