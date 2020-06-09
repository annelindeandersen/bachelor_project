import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import swal from 'sweetalert';

const PasswordReset = () => {
    const params = new URLSearchParams(window.location.search);
    const apiKey = params.get('key');
    console.log(apiKey);
    // States
    const [sPassword, setPassword] = useState('');
    const [sPasswordConfirmation, setPasswordConfirmation] = useState('');

    const el = document.createElement('div')
    el.innerHTML = "You can now login<a href='/restaurant-login'>link</a>"
    // Current history
    let history = useHistory();
    const resetPassword = () => {
        console.log('click')
        axios.post('/api/reset', {
            api_key: apiKey,
            password: sPassword,
            password_confirmation: sPasswordConfirmation
        })
            .then(function (response) {
                console.log(response)
                console.log(response.status)
                if (response.status === 200) {
                    swal({
                        title: "Success!",
                        content: el,
                        icon: "success"
                      })
                }
                console.log(sPassword)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div className="page container restaurant-forms">
            <div className="profile-page"></div>
            <h1 className="card-header">Password reset</h1>
            <label className="form-label mb-0">Password</label>
            <input value={sPassword} onChange={(e) => setPassword(e.target.value)} id="resetPassword" placeholder="enter new password"  className="form-control mb-4" type="password" />
            <label className="form-label mb-0">Password Confirmation</label>
            <input value={sPasswordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} id="resetPasswordConfirmation" placeholder="confirm new password"  className="form-control" type="password"/>
            <input type="button"  className="btn btn-secondary" value="Send" onClick={resetPassword} />
        </div>
    );
}
export default PasswordReset;