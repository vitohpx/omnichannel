import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Users from './components/Users';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';

function App() {
  return (
    <div className='main'>
      <h1 className='title'>Omnichannel</h1>
      <Routes>
        <Route exact path="*" element={<Users />} />
        <Route path="/users" element={<CreateUser />} />
        <Route path="/users/edit/:id" element={<EditUser />} />
      </Routes>
    </div>
  );
}

export default App;
