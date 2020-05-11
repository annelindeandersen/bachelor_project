import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [user, setUser] = useState({});
    const [sFirstName, setFirstName] = useState('');
    const [sLastName, setLastName] = useState('');
    const [sEmail, setEmail] = useState('');
    const [sPhone, setPhone] = useState('');
    const [sAddress, setAddress] = useState('');
    const [sCity, setCity] = useState('');
    const [sPostCode, setPostCode] = useState('');
    const [sPassword, setPassword] = useState('');
    const [sConfirmPassword, setConfirmPassword] = useState('');

    const authOptions = {
        method: 'POST',
        url: '/api/auth/signup',
        data: {
            first_name: sFirstName,
            last_name: sLastName,
            email: sEmail,
            phone: sPhone,
            address: sAddress,
            city: sCity,
            postcode: sPostCode,
            password: sPassword,
            password_confirmation: sConfirmPassword
        },
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
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

            <input value={sFirstName} onChange={(event) => setFirstName(event.target.value)} id="registerName" name="registerName" className="form-control" placeholder="first name" /><br />
            <input value={sLastName} onChange={(event) => setLastName(event.target.value)} id="registerName" name="registerLastName" className="form-control" placeholder="last name" /><br />
            <input value={sEmail} onChange={(event) => setEmail(event.target.value)} id="registerEmail" name="registerEmail" className="form-control" placeholder="email" /><br />
            <input value={sPhone} onChange={(event) => setPhone(event.target.value)} id="registerEmail" name="registerEmail" className="form-control" placeholder="phone" /><br />
            <input value={sAddress} onChange={(event) => setAddress(event.target.value)} id="registerEmail" name="registerEmail" className="form-control" placeholder="address" /><br />
            <input value={sCity} onChange={(event) => setCity(event.target.value)} id="registerEmail" name="registerEmail" className="form-control" placeholder="city" /><br />
            <input value={sPostCode} onChange={(event) => setPostCode(event.target.value)} id="registerEmail" name="registerEmail" className="form-control" placeholder="post code" /><br />
            <input value={sPassword} onChange={(event) => setPassword(event.target.value)} id="registerPassword" name="registerPassword" className="form-control" type="password" placeholder="password" /><br />
            <input value={sConfirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} id="registerConfirmPassword" name="registerConfirmPassword" className="form-control" type="password" placeholder="confirm password" /><br />
            <meta name="csrf-token" content="{{ csrf_token() }}" />
            <input id="registerButton" className="form-control" type="submit" value="Register" onClick={register} />

        </div>
    );
}

export default Register;

if (document.getElementById('register')) {
    ReactDOM.render(<Register />, document.getElementById('register'));
}