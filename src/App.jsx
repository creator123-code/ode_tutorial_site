import Solver from './pages/Solver';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Solver />} />
    </Routes>
  );
}

export default App;