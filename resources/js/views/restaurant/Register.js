import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';



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
                swal("Ooops", "something went wronf", "error");
            })
    }
    return (
        <div className="page">
            <div className="container pt-5">                
               <div className="form-container card card-shadow">
                <h1 className="orange-text text-center">Register Today</h1>
                    <p>Already have an account? <Link to="/restaurant-login">Login</Link></p>
                    <label className="form-label">Company Name</label>
                    <input value={sName} onChange={(event) => setName(event.target.value)} id="registerRestaurantName" name="registerRestaurantName" className="underline-input" placeholder="restaurant name" />
                    <span className="d-flex justify-content-between">
                        <span className="short-input mr-5">
                            <label className="form-label">Email</label>
                            <input value={sEmail} onChange={(event) => setEmail(event.target.value)} id="registerRestaurantEmail" name="registerRestaurantEmail" className="underline-input" placeholder="email" />
                        </span>
                        <span className="short-input">
                            <label className="form-label">Phone</label>
                            <input value={sPhone} onChange={(event) => setPhone(event.target.value)} id="registerRestaurantPhone" name="registerRestaurantPhone" className="underline-input" placeholder="phone" />
                        </span>
                    </span>
                    <label className="form-label">Address</label>
                    <input value={sAddress} onChange={(event) => setAddress(event.target.value)} id="restaurantRegisterAddress" name="registerRestaurantAddress" className="underline-input" placeholder="street" />
                    <span className="d-flex justify-content-between">
                        <span className="short-input mr-5">
                            <label className="form-label">City</label>
                            <input value={sCity} onChange={(event) => setCity(event.target.value)} id="restaurantRegisterCity" name="registerRestaurantCity" className="underline-input" placeholder="city" />                        </span>
                        <span className="short-input">
                            <label className="form-label">Postcode</label>
                            <input value={sPostcode} onChange={(event) => setPostcode(event.target.value)} id="restaurantRegisterPostcode" name="registerRestaurantPostcode" className="underline-input" placeholder="postcode" />
                        </span>
                    </span>
                    <label htmlFor="countries_select" className="form-label">Country</label><br />
                    <select id="countries_select" value={sCountry} onChange={(event) => setCountry(event.target.value)}>
                        <option>Select a country</option>
                        {
                            aCountries.map(country => (
                                <option value={country.id}>{country.name}</option>
                            ))
                        }
                    </select>
                    <label className="form-label pt-4">Password</label>
                    <input value={sPassword} onChange={(event) => setPassword(event.target.value)} id="registerPassword" name="registerPassword" className="underline-input" type="password" placeholder="password" />
                    <label className="form-label">Password Confirmation</label>
                   <input value={sConfirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} id="registerConfirmPassword" name="registerConfirmPassword" className="underline-input" type="password" placeholder="confirm password" />
                    <meta name="csrf-token" content="{{ csrf_token() }}" />
                    <input id="registerButton" type="submit" value="Register" className="btn btn-secondary" onClick={register} />
                </div>
            </div>
        </div>
    );
}
export default Register;
if (document.getElementById('restaurantRegister')) {
    ReactDOM.render(<Register />, document.getElementById('restaurantRegister'));
}