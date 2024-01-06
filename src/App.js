import './App.css';
import LoginPage from './Screen/LogInPage';
import SignUpPage from './Screen/SignUpPage';
import HomePage from './Screen/HomePage';
import Workspace from './Screen/Workspace';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/homepage' element={<HomePage />} />
          <Route path='/workspace/:workspaceName' element={<Workspace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
