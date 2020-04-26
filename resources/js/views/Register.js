import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className="container">
            <h1>Register</h1>
        </div>
    )
}

export default Register;

if (document.getElementById('register')) {
    ReactDOM.render(<Register />, document.getElementById('register'));
}