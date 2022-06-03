
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/welcome/Login';
import Signup from './components/welcome/SignUp';

function App() {
  return (
   
    <div>
  
      <Routes>
        
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        
      </Routes>
    </div>
  );
}

export default App;
