import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Profile = () => {
    // Redux states
    const token = useSelector(state => state.usersReducer.token);
    const logout = useSelector(state => state.usersReducer.logout);
    const user = useSelector(state => state.usersReducer.user);
    const dispatch = useDispatch();

    const [message, setMessage] = useState('');
    // const [user, setUser] = useState('');
    let history = useHistory();

    useEffect(() => {
        if (logout === 'click') {
            console.log('Logout is clicked')
            // dispatch({ type: 'LOGOUT_USER', logout: false });
            history.push('/login');
        }
    }, [logout])

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
                console.log(response.data);
                dispatch({ type: 'LOGOUT_USER', logout: false });
                dispatch({ type: 'CURRENT_USER', user: response.data });
                dispatch({ type: 'USER_TOKEN', token: localStorage.getItem('token') });
            }).catch((err) => {
                console.log(err);
                setMessage('Error, this login is incorrect');
                history.push('/login');
            })
    }, [])

    return (
        <div className="container">
            {!user ? '' :
                <div>
                    <h1>{message === '' ? 'Profile for ' + user.first_name + ' ' + user.last_name : message}</h1>
                    <div>
                        <h2>Your details:</h2>
                        <b>Email: </b><p>{user.email}</p>
                        <b>Phone: </b><p>{user.phone}</p>
                        <b>Address: </b><p>{user.address}</p>
                        <b>City: </b><p>{user.city}, {user.postcode}</p>
                    </div>
                    <div>
                        <h2>Your orders:</h2>
                        <b>Order nr: </b><p></p>
                        <b>Date: </b><p></p>
                        <b>Items: </b><p></p>
                        <b>Amount: </b><p></p>
                    </div>
                </div>
            }

        </div>
    )
}

export default Profile;

if (document.getElementById('profile')) {
    ReactDOM.render(<Profile />, document.getElementById('profile'));
}