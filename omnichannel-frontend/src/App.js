import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Users from './components/Users';
import CreateUser from './components/CreateUser';

function App() {
  return (
    <div>

      <h1>Omnichannel</h1>
      <Routes>
        <Route exact path="*" element={<Users />} />
        <Route path="/users" element={<CreateUser />} />
      </Routes>
    </div>
  );
}

export default App;
