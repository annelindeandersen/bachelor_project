import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [user, setUser] = useState({});
    const [sName, setName] = useState('');
    const [sEmail, setEmail] = useState('');
    const [sPassword, setPassword] = useState('');
    const [sConfirmPassword, setConfirmPassword] = useState('');

    let data = {
        name: sName,
        email: sEmail,
        password: sPassword,
        password_confirmation: sConfirmPassword
    }

    const authOptions = {
        method: 'POST',
        url: '/api/auth/signup',
        data: data,
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            // 'Authentication': 'Bearer ' + token
        }
    }

    const register = (e) => {
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
            <h1 className="card-header">Register</h1>

            <input value={sName} onChange={(event) => setName(event.target.value)} id="registerName" name="registerName" className="form-control" placeholder="full name" /><br />
            <input value={sEmail} onChange={(event) => setEmail(event.target.value)} id="registerEmail" name="registerEmail" className="form-control" placeholder="email" /><br />
            <input value={sPassword} onChange={(event) => setPassword(event.target.value)} id="registerPassword" name="registerPassword" className="form-control" type="password" placeholder="password" /><br />
            <input value={sConfirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} id="registerConfirmPassword" name="registerConfirmPassword" className="form-control" type="password" placeholder="confirm password" /><br />
            {/* <input id="confirmRegisterPassword" className="form-control" placeholder="confirm password" /><br /> */}
            <meta name="csrf-token" content="{{ csrf_token() }}" />
            <input id="registerButton" className="form-control" type="submit" value="Register" onClick={register} />

        </div>
    );
}

export default Register;

if (document.getElementById('register')) {
    ReactDOM.render(<Register />, document.getElementById('register'));
}