import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const PasswordResetRequestForm = () => {

    // States
    const [sEmail, setEmail] = useState('');
    const [sMessage, setMessage] = useState('');

    // Current history
    let history = useHistory();
   
    const sendPasswordRequest = () => {
   
        axios.post('/api/sendPasswordResetEmail', {
            email: sEmail
          })
          .then(function (response) {
              console.log(response)
              console.log(response.status)
              if(response.status === 201){
                setMessage('An email has been sent to yoour email with a link to reset your password.') 
              }

          })
          .catch(function (error) {
            console.log(error);
          });  
    }

    return (
        <div className="container d-flex justify-content-center">
            <h1 className="card-header">Request a link to reset your password</h1><br />
            <p>{sMessage}</p>
            <input value={sEmail} onChange={(e) => setEmail(e.target.value)} id="loginEmail" className="form-control" placeholder="email" /><br />
            <input type="button"
            value="Send" onClick={sendPasswordRequest}/>
        </div>
    );
}

export default PasswordResetRequestForm;

