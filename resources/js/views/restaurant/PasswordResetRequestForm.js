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
        <div className="page">
            <div className="container pt-5">
                <div className="card card-shadow">
                    <div className="form-container">
                    <h1 className="orange-text text-center">Request a link</h1>
                        <p>{sMessage}</p>
                        <label className="form-label">Email</label>
                        <input value={sEmail} onChange={(e) => setEmail(e.target.value)} id="loginEmail" className="underline-input" placeholder="email" /><br />
                        <input type="button" className="btn btn-secondary" 
                            value="Send" onClick={sendPasswordRequest} />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PasswordResetRequestForm;