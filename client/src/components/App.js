import React, { useState } from 'react';
import Routes from './Routes';
import Nav from './shared/Nav';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const getUser = () => {
    const user = sessionStorage.getItem('user');
    if (user) return JSON.parse(user);
    return false;
  }

  const [user, setUser] = useState(getUser());

  return (
    <React.Fragment>
      <ToastContainer/>
      <Nav user={user}/>
      <Routes user={user} setUser={setUser}/>
    </React.Fragment>
  );
}

export default App;
