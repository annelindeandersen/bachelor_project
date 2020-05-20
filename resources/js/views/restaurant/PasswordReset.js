import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const PasswordReset = () => {

    const params = new URLSearchParams(window.location.search);
    const apiKey = params.get('key');
    console.log(apiKey);

    // States
    const [sPassword, setPassword] = useState('');
    const [sPasswordConfirmation, setPasswordConfirmation] = useState('');

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
              if(response.status === 201){
                setMessage('An email has been sent to yoour email with a link to reset your password.') 
            }
      console.log(sPassword)

          })
          .catch(function (error) {
            console.log(error);
          });  
    }


    return (
        <div className="container d-flex justify-content-center">
            <h1 className="card-header">Reset your password</h1><br />
            <input value={sPassword} onChange={(e) => setPassword(e.target.value)} id="resetPassword" className="form-control" placeholder="enter new password" /><br />
            <input value={sPasswordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} id="resetPasswordConfirmation" className="form-control" placeholder="confirm new password" /><br />
            <input type="button"
            value="Send" onClick={resetPassword}/>
        </div>
    );
}

export default PasswordReset;