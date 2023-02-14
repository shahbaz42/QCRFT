import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    setLoggedIn(false);
    setUser({});
  };

  const handleAuthorization = () => {
    /* global google */
    const client = google.accounts.oauth2.initCodeClient({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      scope: 'https://www.googleapis.com/auth/drive',
      ux_mode: 'popup',
      callback: (response) => {
      },
    });
    client.requestCode();
  };

  return (
    <>
      <div>
        <h1>QuizCraft</h1>
        { loggedIn &&
          <div>
            <img src={user.picture} alt="user_pic" ></img>
            <h2>Welcome, {user.name}</h2>
            <h3>{user.email}</h3>
            <button onClick={(e) => {handleLogout(e)}}>Sign Out</button>
          </div>
        }
        { !loggedIn && 
          <button onClick={handleAuthorization}>Authorize with Google</button>
        }
      </div>
    </>
  );
}

export default App;
