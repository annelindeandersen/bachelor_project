import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Profile = () => {
    // Redux states
    const token = useSelector(state => state.usersReducer.token);
    const logout = useSelector(state => state.usersReducer.logout);
    const dispatch = useDispatch();

    const [message, setMessage] = useState('');
    const [user, setUser] = useState('');
    let history = useHistory();

    useEffect(() => {
        console.log({ 'TOKEN': token });

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
                dispatch({ type: 'CURRENT_USER', user: response.data });
                dispatch({ type: 'USER_TOKEN', token: localStorage.getItem('token') });
            }).catch((err) => {
                console.log(err);
                setMessage('Error, this login is incorrect');
                history.push('/login');
            })

    }, [])

    useEffect(() => {
        if (logout === true) {
            console.log('Logout is clicked')
            history.push('/login');
        }
    }, [logout])

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