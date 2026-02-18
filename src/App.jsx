// App.jsx
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/main/HomePage';
import InflammationPage from './pages/topic/InflammationPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/topic/inflammation" element={<InflammationPage />} />
    </Routes>
  );
}

export default App;