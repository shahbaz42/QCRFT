import React from 'react'
import Dashboard from '../Components/Dashboard'


export default function CraftForm() {
  return (
    
    <div className='' style={{
        height: "100vh", 
        width:"100vw",
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
        backgroundColor: "#d7f0f5",
        backgroundImage: "linear-gradient(rgba(174,144,245, 0.0), rgba(174,144,245, 0.0)), linear-gradient(to bottom, transparent, transparent 20%, #fff 20%, #fff 90%, transparent 90%), linear-gradient(to right, transparent, transparent 20%, #fff 20%, #fff 90%, transparent 90%), linear-gradient(to right, #eee, #eee 20%, #fff 20%, #fff 90%, #eee 90%)",
        backgroundSize: "10px 10px",
        overflowY: "scroll",
        }}>
        <Dashboard />
    </div>
  )
}





// import React, {useState, useRef} from 'react';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext'

// export default function CraftForm() {
//     const {loggedIn, currentUser, logout} = useAuth();

//     return (
//         <>
//             <h1>Craft Form</h1>
//             <button onClick={logout}>Logout </button>
//             {loggedIn ? <p>Logged in as {currentUser.email}</p> : <p>Not logged in</p>}
//         </>
//     )

    // const [user, setUser] = useState({});
    // const [loggedIn, setLoggedIn] = useState(false);
    // const [buttonName, setButtonName] = useState("Create Form");
    // const [formURL, setFormURL] = useState('');
    // const inputRef = useRef(null);
    // const inputNumRef = useRef(null);

    // const handleLogout = () => {
    //     setLoggedIn(false);
    //     setUser({});
    // };

    // const placeRequest = () => {
    //     setButtonName("Creating Form...")
    //     const url = 'http://localhost:3001/api/quiz/createQuiz';
    //     const data = {
    //         url: inputRef.current.value,
    //         num: inputNumRef.current.value,
    //     };
    //     const headers = {
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Bearer ' + localStorage.getItem('token'),
    //     };
    //     axios.post(url, data, { headers })
    //         .then((res) => {
    //             setButtonName("Create Another Form");
    //             setFormURL(res.data);
    //             console.log(res);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });

    //     // const url = 'http://localhost:3001/api/auth/profile';
    //     // const headers = {
    //     //   'Content-Type': 'application/json',
    //     //   'Authorization': 'Bearer ' + localStorage.getItem('token'),
    //     // };

    //     // axios.get(url, {headers})
    //     //   .then((res) => {
    //     //     console.log(res);
    //     //   })
    //     //   .catch((err) => {
    //     //     console.log(err);
    //     //   });

    // };

    // const handleAuthorization = () => {
    //     /* global google */
    //     const client = google.accounts.oauth2.initCodeClient({
    //         client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    //         scope: 'https://www.googleapis.com/auth/drive',
    //         ux_mode: 'popup',
    //         callback: (response) => {
    //             const { code } = response;
    //             const xhr = new XMLHttpRequest();
    //             xhr.open('POST', 'http://localhost:3001/api/auth/googleAuth');
    //             xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    //             xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    //             xhr.onload = () => {
    //                 const resp = JSON.parse(xhr.responseText);
    //                 localStorage.setItem('token', resp.token);
    //                 setLoggedIn(true);
    //             };
    //             xhr.send('code=' + code);
    //         },
    //     });
    //     client.requestCode();
    // };

    // return (
    //     <>
    //         <div>
    //             {loggedIn &&
    //                 <div>
    //                     {/* <img src={user.picture} alt="user_pic" ></img> */}
    //                     <h2>Welcome, {user.name}</h2>
    //                     <h3>{user.email}</h3>
    //                     <button onClick={(e) => { handleLogout(e) }}>Sign Out</button>
    //                     <br />
    //                     <br />
    //                     <br />
    //                     <input ref={inputRef} placeholder="Video URL" type="text" /><br />
    //                     <input ref={inputNumRef} placeholder="Number of Questions" type="number" /><br />
    //                     <button onClick={(e) => { placeRequest(e) }}> {buttonName} </button>
    //                     {formURL && <a href={formURL}> {formURL}</a>}
    //                 </div>
    //             }
    //             {!loggedIn &&
    //                 <button onClick={handleAuthorization}>Authorize with Google</button>
    //             }
    //             {!loggedIn &&
    //                 <button onClick={handleAuthorization}>Authorize with Google</button>
    //             }
    //         </div>
    //     </>
    // );
// }
