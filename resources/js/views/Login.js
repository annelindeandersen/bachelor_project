import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Login = () => {
    // Redux
    const users = useSelector(state => state.usersReducer.users);
    const dispatch = useDispatch();

    // States
    const [token, setToken] = useState('');
    const [sEmail, setEmail] = useState('');
    const [sPassword, setPassword] = useState('');

    // Current history
    let history = useHistory();

    console.log({ users, token });

    const authOptions = {
        method: 'POST',
        url: '/api/auth/login',
        data: {
            email: sEmail,
            password: sPassword,
        },
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
    }

    const login = (e) => {
        e.preventDefault();

        axios(authOptions)
            .then(response => {
                console.log(response);
                setToken(response.data.access_token);
                dispatch({ type: 'USER_LOGIN', token: response.data.access_token, email: sEmail });
                localStorage.setItem('token', response.data.access_token);
                history.push('/profile');
            }).catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className="container d-flex justify-content-center">
            <h1 className="card-header">Login</h1><br />

            <input value={sEmail} onChange={(e) => setEmail(e.target.value)} id="loginEmail" className="form-control" placeholder="email" /><br />
            <input value={sPassword} onChange={(e) => setPassword(e.target.value)} type="password" id="loginPassword" className="form-control" placeholder="password" /><br />
            <input id="loginButton" className="form-control" type="submit" value="Login" onClick={login} />

        </div>
    );
}

export default Login;

if (document.getElementById('login')) {
    ReactDOM.render(<Login />, document.getElementById('login'));
}