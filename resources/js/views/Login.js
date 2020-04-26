import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [user, setUser] = useState({});
    const [sEmail, setEmail] = useState('');
    const [sPassword, setPassword] = useState('');

    let data = {
        email: sEmail,
        password: sPassword,
    }

    const authOptions = {
        method: 'POST',
        url: '/api/auth/login',
        data: data,
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            // 'Authentication': 'Bearer ' + token
        }
    }

    const login = (e) => {
        e.preventDefault();

        axios(authOptions)
            .then(response => {
                console.log(response);
                setUser(response.data);
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