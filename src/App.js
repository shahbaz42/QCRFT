import { useState } from 'react';
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
        const { code } = response;
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3001/api/auth/googleAuth');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.onload = () => {
          console.log(xhr.responseText);
        };
        xhr.send('code=' + code);
      },
    });
    client.requestCode();
  };

  return (
    <>
      <div>
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
