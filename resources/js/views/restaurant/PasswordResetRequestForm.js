import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import swal from 'sweetalert';

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
                if (response.status === 201) {
                    setMessage('An email has been sent to yoour email with a link to reset your password.')
                    swal("Success", "You're email has beens sent", "success");
                } 
            })
            .catch(function (error) {
                console.log(error);
                swal("Ooops", "You may have entered the wrong email or you already have a link", "error");
            });
    }
    return (
        <div className="page container restaurant-forms">
            <div className="profile-page"></div>
            <h1 className="card-header">Request a password reset link</h1>
            <p>{sMessage}</p>
            <label className="form-label mb-0">Email address</label>
            <input value={sEmail} onChange={(e) => setEmail(e.target.value)} id="loginEmail" className="form-control" placeholder="email" /><br />
             <input type="button" className="blue-button" value="Send" onClick={sendPasswordRequest} />
        </div>
    );
}
export default PasswordResetRequestForm;