import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

const Register = () => {

    const [aCountries, setCountries] = useState([]);
    const [nameMsg, setNameMsg] = useState('');
    const [emailMsg, setEmailMsg] = useState('');
    const [phoneMsg, setPhoneMsg] = useState('');
    const [addressMsg, setAddressMsg] = useState('');
    const [cityMsg, setCityMsg] = useState('');
    const [postcodeMsg, setPostcodeMsg] = useState('');
    const [countryMsg, setCountryMsg] = useState('');
    const [passwordMsg, setPasswordMsg] = useState('');
    const [password2Msg, setPassword2Msg] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: '',
        postcode: '',
        country: '',
        password: '',
        password_confirmation: ''
    })

    const { name, email, phone, city, address, country, postcode, password, password_confirmation } = formData;


    const handleChange = (e) => {
        if (name) { setNameMsg('') }
        if (email) { setEmailMsg('') }
        if (phone) { setPhoneMsg('') }
        if (address) { setAddressMsg('') }
        if (city) { setCityMsg('') }
        if (country) { setCountryMsg('') }
        if (postcode) { setPostcodeMsg('') }
        if (password) { setPasswordMsg('') }
        if (password2) { setPassword2Msg('') }
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    //get countries for select options
    const getCountries = async () => {
        const result = await fetch('/api/getCountries', {
            method: 'get',
            methods: {
                'Content-Type': 'aplication/json',
            }
        });
        console.log(result);
        const data = await result.json();
        setCountries(data);
    }


    useEffect(() => {
        getCountries();
    }, [])

    const register = (e) => {
        e.preventDefault();
        if (!name) { setNameMsg('Enter a name') }
        if (!validateEmail(email)) { setEmailMsg('Enter a valid email') }
        if (!phone) { setPhoneMsg('Enter a phone number') }
        if (!address) { setAddressMsg('Enter an address') }
        if (!city) { setCityMsg('Enter a city') }
        if (!country) { setCountryMsg('Select a country') }
        if (!postcode) { setPostcodeMsg('Enter a postcode') }
        if (!password) { setPasswordMsg('Enter a password') }
        if (password !== password_confirmation) { setPassword2Msg('Enter a matching password') }
        axios.post('/api/auth/restaurantRegister', {
            name, email, phone, address, city, postcode, country, password, password_confirmation

        })
            .then(response => {

                if (response.status === 201) {
                    var elem = document.createElement("div");
                    elem.innerHTML = "<a href='/restaurant-login'>Login</a>";
                    swal({
                        text: "Successfully registered",
                        icon: "success",
                        timer: 2000,
                        content: elem,
                        button: false
                    })
                }
            }).catch((err) => {
                console.log(err);
                swal("Ooops", "something went wrong", "error");
            })
    }
    return (
        <div className="page container restaurant-forms">
            <div className="profile-page"></div>
            <h1 className="card-header">Register Today</h1>
            <p>Already have an account? <Link to="/restaurant-login">Login</Link></p>
            <label className="form-label mb-0">Restaurant Name</label>
            <input onChange={handleChange} id="registerRestaurantName" name="name" className="form-control" placeholder="restaurant name" />
            <div className="form-error-msg">{nameMsg}</div>
            <div className="detail-wrap">
                <div>
                    <label className="form-label mb-0">Email address</label>
                    <input onChange={handleChange} id="registerRestaurantEmail" name="email" className="form-control" placeholder="email" />
                    <div className="form-error-msg">{emailMsg}</div>
                </div>
                <div>
                    <label className="form-label mb-0">Phone number</label>
                    <input onChange={handleChange} id="registerRestaurantPhone" name="phone" className="form-control" placeholder="phone" />
                    <div className="form-error-msg">{phoneMsg}</div>
                </div>
            </div>
            <label className="form-label mb-0">Address</label>
            <input onChange={handleChange} id="restaurantRegisterAddress" name="address" className="form-control" placeholder="street" />
            <div className="form-error-msg">{addressMsg}</div>
            <div className="detail-wrap">
                <div>
                    <label className="form-label mb-0">City</label>
                    <input onChange={handleChange} id="restaurantRegisterCity" name="city" className="form-control" placeholder="city" />
                    <div className="form-error-msg">{cityMsg}</div>
                </div>
                <div>
                    <label className="form-label mb-0">Postcode</label>
                    <input onChange={handleChange} id="restaurantRegisterPostcode" name="postcode" className="form-control" placeholder="postcode" />
                    <div className="form-error-msg">{postcodeMsg}</div>
                </div>
            </div>
            <label htmlFor="countries_select" className="form-label mb-0" name="postcode">Country</label><br />
            <select id="countries_select" name="country" onChange={handleChange}  >
                <option>Select a country</option>
                {
                    aCountries.map((country, i) => (

                        <option key={i} value={country.id}>{country.name}</option>
                    ))
                }
            </select>
            <div className="form-error-msg">{countryMsg}</div>
            <div className="detail-wrap">
                <div>
                    <label className="form-label mb-0">Password</label>
                    <input onChange={handleChange} id="registerPassword" name="password" className="form-control" type="password" placeholder="password" />
                    <div className="form-error-msg">{passwordMsg}</div>
                </div>
                <div>
                    <label className="form-label mb-0">Password Confirmation</label>
                    <input onChange={handleChange} id="password2" name="password_confirmation" className="form-control" type="password" placeholder="confirm password" />
                    <div className="form-error-msg">{password2Msg}</div>
                </div>
            </div>

            <input type="checkbox" id="restaurant-consent" />
            <label htmlFor="restaurant-consent" className="ml-1 mb-3 mt-5">By clicking this, you are consenting to out terms of serve. Read our full terms and conditions.</label>
            <meta name="csrf-token" content="{{ csrf_token() }}" />
            <input id="registerButton" type="submit" value="Register" className="blue-button" onClick={register} />
        </div>

    );
}
export default Register;
if (document.getElementById('restaurantRegister')) {
    ReactDOM.render(<Register />, document.getElementById('restaurantRegister'));
}