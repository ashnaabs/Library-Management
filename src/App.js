import './App.css';
import Home from './Component/Home';
import Create from './Component/Create';
import Bookhome from './Component/Bookhome';
import BookCreate from './Component/Bookcreate';
import Register from './Component/Credentials/Register';
import User_login from './Component/Credentials/User_login';
import Admin_login from './Component/Credentials/Admin_login';
import Bookhome2 from './Component/Bookhome2';
import Home2 from './Component/Home2';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<User_login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home />} />
          <Route path='/home2' element={<Home2 />} />
          <Route path='/create' element={<Create />} />
          <Route path='/bookhome' element={<Bookhome />} />
          <Route path='/bookhome2' element={<Bookhome2 />} />
          <Route path='/bookcreate' element={<BookCreate />} />
          <Route path='/admin-login' element={<Admin_login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
