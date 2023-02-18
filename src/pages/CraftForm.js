import React, {useState, useRef} from 'react';
import axios from 'axios';

export default function CraftForm() {
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [buttonName, setButtonName] = useState("Create Form");
    const [formURL, setFormURL] = useState('');
    const inputRef = useRef(null);
    const inputNumRef = useRef(null);

    const handleLogout = () => {
        setLoggedIn(false);
        setUser({});
    };

    const placeRequest = () => {
        setButtonName("Creating Form...")
        const url = 'http://localhost:3001/api/quiz/createQuiz';
        const data = {
            url: inputRef.current.value,
            num: inputNumRef.current.value,
        };
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        };
        axios.post(url, data, { headers })
            .then((res) => {
                setButtonName("Create Another Form");
                setFormURL(res.data);
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });

        // const url = 'http://localhost:3001/api/auth/profile';
        // const headers = {
        //   'Content-Type': 'application/json',
        //   'Authorization': 'Bearer ' + localStorage.getItem('token'),
        // };

        // axios.get(url, {headers})
        //   .then((res) => {
        //     console.log(res);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });

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
                    const resp = JSON.parse(xhr.responseText);
                    localStorage.setItem('token', resp.token);
                    setLoggedIn(true);
                };
                xhr.send('code=' + code);
            },
        });
        client.requestCode();
    };

    return (
        <>
            <div>
                {loggedIn &&
                    <div>
                        {/* <img src={user.picture} alt="user_pic" ></img> */}
                        <h2>Welcome, {user.name}</h2>
                        <h3>{user.email}</h3>
                        <button onClick={(e) => { handleLogout(e) }}>Sign Out</button>
                        <br />
                        <br />
                        <br />
                        <input ref={inputRef} placeholder="Video URL" type="text" /><br />
                        <input ref={inputNumRef} placeholder="Number of Questions" type="number" /><br />
                        <button onClick={(e) => { placeRequest(e) }}> {buttonName} </button>
                        {formURL && <a href={formURL}> {formURL}</a>}
                    </div>
                }
                {!loggedIn &&
                    <button onClick={handleAuthorization}>Authorize with Google</button>
                }
            </div>
        </>
    );
}