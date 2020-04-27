import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Profile = () => {
    const [message, setMessage] = useState('');
    const token = useSelector(state => state.usersReducer.token);
    const [user, setUser] = useState('');

    // useEffect(() => {
    //     localStorage.setItem('token', token);
    //     const savedToken = localStorage.getItem('token');

    //     console.log(savedToken);
    // }, [user])

    useEffect(() => {
        console.log(token);

        const authOptions = {
            method: 'GET',
            url: '/api/auth/user',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        axios(authOptions)
            .then(response => {
                console.log(response);
                setUser(response.data);
            }).catch((err) => {
                console.log(err);
                setMessage('Error, this login is incorrect');
            })
    }, [])

    return (
        <div className="container">
            <h1>{message === '' ? 'Profile for ' + user.name : message}</h1>
        </div>
    )
}

export default Profile;

if (document.getElementById('profile')) {
    ReactDOM.render(<Profile />, document.getElementById('profile'));
}