import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

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
                swal("Success!", "You have now been registered!", "success");
            }).catch((err) => {
                console.log(err);
                swal("Error!", "Something went wrong. Please try again.", "error");
            })
    }

    return (
        <div className="page container d-flex justify-content-center">
            <div className="profile-page"></div>
            <h1 className="card-header">Register</h1>
            <div className="register-wrapper">
                <div className="detail-wrap">
                    <div>
                        <label>FIRST NAME</label>
                        <input value={sFirstName} onChange={(event) => setFirstName(event.target.value)} className="form-control" type="text" id="registerName" name="registerName" placeholder="first name" />
                    </div>
                    <div>
                        <label>LAST NAME</label>
                        <input value={sLastName} onChange={(event) => setLastName(event.target.value)} className="form-control" type="text" id="registerLastName" name="registerLastName" placeholder="last name" />
                    </div>
                </div>
                <div className="detail-wrap">
                    <div>
                        <label>EMAIL</label>
                        <input value={sEmail} onChange={(event) => setEmail(event.target.value)} className="form-control" type="email" id="registerEmail" name="registerEmail" placeholder="email" />
                    </div>
                    <div>
                        <label>PHONE</label>
                        <input value={sPhone} onChange={(event) => setPhone(event.target.value)} className="form-control" type="text" id="registerPhone" name="registerPhone" placeholder="phone" />
                    </div>
                </div>
                <div>
                    <label>ADDRESS</label>
                    <input value={sAddress} onChange={(event) => setAddress(event.target.value)} className="form-control" type="text" id="registerAddress" name="registerAddress" placeholder="address" />
                </div>
                <div className="detail-wrap">
                    <div>
                        <label>CITY</label>
                        <input value={sCity} onChange={(event) => setCity(event.target.value)} className="form-control" type="text" id="registerName" name="registerName" placeholder="city" />
                    </div>
                    <div>
                        <label>POST CODE</label>
                        <input value={sPostCode} onChange={(event) => setPostCode(event.target.value)} className="form-control" type="text" id="registerLastName" name="registerLastName" placeholder="post code" />
                    </div>
                </div>
                <div className="detail-wrap">
                    <div>
                        <label>PASSWORD</label>
                        <input value={sPassword} onChange={(event) => setPassword(event.target.value)} className="form-control" type="text" id="registerName" name="registerName" placeholder="password" />
                    </div>
                    <div>
                        <label>CONFIRM PASSWORD</label>
                        <input value={sConfirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="form-control" type="text" id="registerLastName" name="registerLastName" placeholder="confirm password" />
                    </div>
                </div>

                <meta name="csrf-token" content="{{ csrf_token() }}" />
                <input id="registerButton" className="blue-button" type="submit" value="Register" onClick={register} />
            </div>
        </div>
    );
}
export default Register;
if (document.getElementById('register')) {
    ReactDOM.render(<Register />, document.getElementById('register'));
}