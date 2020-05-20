import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [user, setUser] = useState({});
    const [sName, setName] = useState('');
    const [sEmail, setEmail] = useState('');
    const [sPhone, setPhone] = useState('');
    const [sAddress, setAddress] = useState('');
    const [sCity, setCity] = useState('');
    const [sPostcode, setPostcode] = useState('');
    const [sCountry, setCountry] = useState('');
    const [sPassword, setPassword] = useState('');
    const [sConfirmPassword, setConfirmPassword] = useState('');
    const [aCountries, setCountries] = useState([]);

    //get countis for select options
    const getCountries = async () => {
        const result = await fetch('/api/getCountries', {
            method: 'get',
            methods: {
                'Content-Type': 'aplication/json',
            }
        });
        console.log(result);
        const data = await result.json();
        console.log(data);
        setCountries(data);
    }

    useEffect(() => {
        getCountries();
    }, [])


    const authOptions = {
        method: 'POST',
        url: '/api/auth/restaurantRegister',
        data: {
            name: sName,
            email: sEmail,
            phone: sPhone,
            address: sAddress,
            city: sCity,
            postcode: sPostcode,
            country: sCountry,
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
            <h1 className="card-header">Register your restaurant</h1>
            <p>Already have an account?<Link to="/restaurant-login">LOGIN</Link></p>
            <input value={sName} onChange={(event) => setName(event.target.value)} id="registerRestaurantName" name="registerRestaurantName" className="form-control" placeholder="restaurant name" /><br />
            <input value={sEmail} onChange={(event) => setEmail(event.target.value)} id="registerRestaurantEmail" name="registerRestaurantEmail" className="form-control" placeholder="email" /><br />
            <input value={sPhone} onChange={(event) => setPhone(event.target.value)} id="registerRestaurantPhone" name="registerRestaurantPhone" className="form-control" placeholder="phone" /><br />
            <input value={sAddress} onChange={(event) => setAddress(event.target.value)} id="restaurantRegisterAddress" name="registerRestaurantAddress" className="form-control" placeholder="street" /><br />
            <input value={sCity} onChange={(event) => setCity(event.target.value)} id="restaurantRegisterCity" name="registerRestaurantCity" className="form-control" placeholder="city" /><br />
            <input value={sPostcode} onChange={(event) => setPostcode(event.target.value)} id="restaurantRegisterPostcode" name="registerRestaurantPostcode" className="form-control" placeholder="postcode" /><br />
            <label htmlFor="countries_select">Select Country</label>
            <select id="countries_select" value={sCountry} onChange={(event) => setCountry(event.target.value)}>
                <option>Select a country</option>
                {
                    aCountries.map(country => (
                        <option value={country.id}>{country.name}</option>
                    ))
                }
            </select>
            <input value={sPassword} onChange={(event) => setPassword(event.target.value)} id="registerPassword" name="registerPassword" className="form-control" type="password" placeholder="password" /><br />
            <input value={sConfirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} id="registerConfirmPassword" name="registerConfirmPassword" className="form-control" type="password" placeholder="confirm password" /><br />
            <meta name="csrf-token" content="{{ csrf_token() }}" />
            <input id="registerButton" className="form-control" type="submit" value="Register" onClick={register} />
        </div>
    );
}
export default Register;
if (document.getElementById('restaurantRegister')) {
    ReactDOM.render(<Register />, document.getElementById('restaurantRegister'));
}