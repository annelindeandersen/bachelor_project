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
        <div className="page container d-flex justify-content-center">
            <h1 className="card-header">Register</h1>

            <div className="detail-wrap">
                <div>
                    <label>FIRST NAME</label>
                    <input value={sFirstName} onChange={(event) => setFirstName(event.target.value)} className="underline-input" type="text" id="registerName" name="registerName" placeholder="first name" />
                </div>
                <div>
                    <label>LAST NAME</label>
                    <input value={sLastName} onChange={(event) => setLastName(event.target.value)} className="underline-input" type="text" id="registerLastName" name="registerLastName" placeholder="last name" />
                </div>
            </div>
            <div className="detail-wrap">
                <div>
                    <label>EMAIL</label>
                    <input value={sEmail} onChange={(event) => setEmail(event.target.value)} className="underline-input" type="email" id="registerEmail" name="registerEmail" placeholder="email" />
                </div>
                <div>
                    <label>PHONE</label>
                    <input value={sPhone} onChange={(event) => setPhone(event.target.value)} className="underline-input" type="text" id="registerPhone" name="registerPhone" placeholder="phone" />
                </div>
            </div>
            <div>
                <label>ADDRESS</label>
                <input value={sAddress} onChange={(event) => setAddress(event.target.value)} className="underline-input" type="text" id="registerAddress" name="registerAddress" placeholder="address" />
            </div>
            <div className="detail-wrap">
                <div>
                    <label>CITY</label>
                    <input value={sCity} onChange={(event) => setCity(event.target.value)} className="underline-input" type="text" id="registerName" name="registerName" placeholder="city" />
                </div>
                <div>
                    <label>POST CODE</label>
                    <input value={sPostCode} onChange={(event) => setPostCode(event.target.value)} className="underline-input" type="text" id="registerLastName" name="registerLastName" placeholder="post code" />
                </div>
            </div>
            <div className="detail-wrap">
                <div>
                    <label>PASSWORD</label>
                    <input value={sPassword} onChange={(event) => setPassword(event.target.value)} className="underline-input" type="text" id="registerName" name="registerName" placeholder="password" />
                </div>
                <div>
                    <label>CONFIRM PASSWORD</label>
                    <input value={sConfirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="underline-input" type="text" id="registerLastName" name="registerLastName" placeholder="confirm password" />
                </div>
            </div>

            {/* <input value={sFirstName} onChange={(event) => setFirstName(event.target.value)} id="registerName" name="registerName" className="form-control" placeholder="first name" /><br />
            <input value={sLastName} onChange={(event) => setLastName(event.target.value)} id="registerName" name="registerLastName" className="form-control" placeholder="last name" /><br /> */}
            {/* <input value={sEmail} onChange={(event) => setEmail(event.target.value)} id="registerEmail" name="registerEmail" className="form-control" placeholder="email" /><br /> */}
            {/* <input value={sPhone} onChange={(event) => setPhone(event.target.value)} id="registerEmail" name="registerEmail" className="form-control" placeholder="phone" /><br /> */}
            {/* <input value={sAddress} onChange={(event) => setAddress(event.target.value)} id="registerEmail" name="registerEmail" className="form-control" placeholder="address" /><br />
            <input value={sCity} onChange={(event) => setCity(event.target.value)} id="registerEmail" name="registerEmail" className="form-control" placeholder="city" /><br />
            <input value={sPostCode} onChange={(event) => setPostCode(event.target.value)} id="registerEmail" name="registerEmail" className="form-control" placeholder="post code" /><br />
            <input value={sPassword} onChange={(event) => setPassword(event.target.value)} id="registerPassword" name="registerPassword" className="form-control" type="password" placeholder="password" /><br />
            <input value={sConfirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} id="registerConfirmPassword" name="registerConfirmPassword" className="form-control" type="password" placeholder="confirm password" /><br /> */}
            <meta name="csrf-token" content="{{ csrf_token() }}" />
            <input id="registerButton" className="form-control orange-button" type="submit" value="Register" onClick={register} />

        </div>
    );
}

export default Register;

if (document.getElementById('register')) {
    ReactDOM.render(<Register />, document.getElementById('register'));
}