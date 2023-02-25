import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [currentUser, setCurrentUser] = useState();
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            axios.get(`${process.env.REACT_APP_SERVER_URL}/api/auth/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setCurrentUser(res.data);
                localStorage.setItem('user', JSON.stringify(res.data));
                localStorage.setItem('token', token);
                setLoggedIn(true);
                setLoading(false);
            })
            .catch((err) => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setLoggedIn(false);
            });
        }
        setLoading(false);
    }, [token]);

    function startAuthorization() {
        /* global google */
        const client = google.accounts.oauth2.initCodeClient({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
            ux_mode: 'popup',
            callback: (response) => {
                const { code } = response;
                const xhr = new XMLHttpRequest();
                xhr.open('POST', `${process.env.REACT_APP_SERVER_URL}/api/auth/googleAuth`);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                xhr.onload = () => {
                    const resp = JSON.parse(xhr.responseText);
                    setToken(resp.token);
                };
                xhr.send('code=' + code);
            },
        });
        client.requestCode();
    }

    function logout() {
        setCurrentUser(null);
        setLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    const value = {
        token,
        startAuthorization,
        currentUser,
        loggedIn,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}