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

    useEffect(() => {
        // set logout to true, so user can login again
        dispatch({ type: 'LOGOUT_USER', logout: true });
    }, [])

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
                dispatch({ type: 'USER_TOKEN', token: response.data.access_token });
                // dispatch({ type: 'LOGOUT_USER', logout: false });
                localStorage.setItem('token', response.data.access_token);
                history.push('/profile');
            }).catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className="container d-flex justify-content-center">
            <h1 className="card-header">Login</h1><br />

            <div>
                <label>EMAIL</label>
                <input value={sEmail} onChange={(event) => setEmail(event.target.value)} className="underline-input" type="text" id="loginEmail" placeholder="email" />
            </div>
            <div>
                <label>PASSWORD</label>
                <input value={sPassword} onChange={(event) => setPassword(event.target.value)} className="underline-input" type="password" id="loginPassword" placeholder="password" />
            </div>
            {/* <input value={sEmail} onChange={(e) => setEmail(e.target.value)} id="loginEmail" className="form-control" placeholder="email" /><br /> */}
            {/* <input value={sPassword} onChange={(e) => setPassword(e.target.value)} type="password" id="loginPassword" className="form-control" placeholder="password" /><br /> */}
            <input id="loginButton" className="form-control orange-button" type="submit" value="Login" onClick={login} />

        </div>
    );
}

export default Login;

if (document.getElementById('login')) {
    ReactDOM.render(<Login />, document.getElementById('login'));
}