import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

const Profile = () => {
    // Redux states
    const token = useSelector(state => state.usersReducer.token);
    const logout = useSelector(state => state.usersReducer.logout);
    const user = useSelector(state => state.usersReducer.user);
    const dispatch = useDispatch();

    // component states
    const [profileComponent, setProfileComponent] = useState(true);
    const [orderComponent, setOrderComponent] = useState(false);
    const [settingsComponent, setSettingsComponent] = useState(false);
    const [passwordComponent, setPasswordComponent] = useState(false);

    // form states
    const [sFirstName, setFirstName] = useState('');
    const [sLastName, setLastName] = useState('');
    const [sEmail, setEmail] = useState('');
    const [sPhone, setPhone] = useState('');
    const [sAddress, setAddress] = useState('');
    const [sCity, setCity] = useState('');
    const [sPost, setPost] = useState('');
    const [sPassword, setPassword] = useState('');
    const [sNewPassword, setNewPassword] = useState('');
    const [sConfirmPassword, setConfirmPassword] = useState('');

    const [message, setMessage] = useState('');
    const [order, setOrder] = useState('');
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

    useEffect(() => {
        axios.get('/api/getorder', { params: { user: user && user.id } })
            .then(response => {
                console.log(response)
                setOrder(response);
            })
            .catch(error => {
                console.log(error)
            })
    }, [user])

    const profileClick = () => {
        console.log('profile click');
        setProfileComponent(true);
        setOrderComponent(false);
        setSettingsComponent(false);
        setPasswordComponent(false);
    }

    const orderClick = () => {
        console.log('order click');
        setOrderComponent(true);
        setProfileComponent(false);
        setSettingsComponent(false);
        setPasswordComponent(false);
    }

    const settingsClick = () => {
        console.log('settings click');
        setSettingsComponent(true);
        setProfileComponent(false);
        setOrderComponent(false);
        setPasswordComponent(false);
    }

    const passwordClick = () => {
        console.log('password click');
        setPasswordComponent(true);
        setSettingsComponent(false);
        setProfileComponent(false);
        setOrderComponent(false);
    }

    const updateProfile = () => {
        console.log('update profile');

        axios.post('/api/auth/update', {
            user: user && user.id, first_name: sFirstName, last_name: sLastName, email: sEmail, phone: sPhone, address: sAddress, city: sCity, postcode: sPost, headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        })
    }

    const updatePassword = () => {
        console.log('update password');

        axios.post('/api/auth/password', {
            user: user && user.id, password: sPassword, new_password: sNewPassword, confirm_password: sConfirmPassword, headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        })
    }


    return (
        <div className="container">
            {!user ? '' :
                <div>
                    <h1>{message === '' ? 'Profile for ' + user.first_name + ' ' + user.last_name : message}</h1>
                    <h4 onClick={profileClick}>Profile</h4>
                    <h4 onClick={orderClick}>Orders</h4>
                    <h4 onClick={settingsClick}>Settings</h4>
                    <h4 onClick={passwordClick}>Change password</h4>
                    <div id="profileWrapper">
                        <div className={classNames({ 'hidden': !profileComponent, 'visible': profileComponent })}>
                            <h2>Your details:</h2>
                            <b>Email: </b><p>{user.email}</p>
                            <b>Phone: </b><p>{user.phone}</p>
                            <b>Address: </b><p>{user.address}</p>
                            <b>City: </b><p>{user.city}, {user.postcode}</p>
                        </div>
                        <div className={classNames({ 'hidden': !orderComponent, 'visible': orderComponent })}>
                            <h2>Your orders:</h2>
                            {order && order.data.map((item, index) => (
                                <div className="order-item" key={index}>
                                    <div className="order">
                                        <b>Order ID: </b><p>{item.order.id}</p>
                                        <b>Date: </b><p>{item.order.delivery_time}</p>
                                        <b>Amount: </b><p>{item.order.total_amount}</p>
                                        <b>Restaurant: </b><p>{item.restaurant.name}</p>
                                        <b>Accepted: </b><p>{item.order.accepted}</p>
                                        <b>Status: </b><p>{item.order.status}</p>
                                    </div>
                                    <div>
                                        {item.order_items.map((order_item, index) => (
                                            <div key={index}>
                                                <img src={`.img/${order_item.menu_item.title}`} alt={order_item.menu_item.id} />
                                                {order_item.menu_item.title}
                                                {order_item.menu_item.price}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={classNames({ 'hidden': !settingsComponent, 'visible': settingsComponent })}>
                            <h2>Settings</h2>
                            <input value={sFirstName} onChange={(event) => setFirstName(event.target.value)} className="form-control" type="text" placeholder="change first name" /><br />
                            <input value={sLastName} onChange={(event) => setLastName(event.target.value)} className="form-control" type="text" placeholder="change last name" /><br />
                            <input value={sEmail} onChange={(event) => setEmail(event.target.value)} className="form-control" type="text" placeholder="change email" /><br />
                            <input value={sPhone} onChange={(event) => setPhone(event.target.value)} className="form-control" type="integer" placeholder="change phone number" /><br />
                            <input value={sAddress} onChange={(event) => setAddress(event.target.value)} className="form-control" type="text" placeholder="change address" /><br />
                            <input value={sCity} onChange={(event) => setCity(event.target.value)} className="form-control" type="text" placeholder="change city" /><br />
                            <input value={sPost} onChange={(event) => setPost(event.target.value)} className="form-control" type="text" placeholder="change postal code" /><br />
                            <input onClick={updateProfile} className="form-control" type="submit" value="Update" />
                        </div>
                        <div className={classNames({ 'hidden': !passwordComponent, 'visible': passwordComponent })}>
                            <h2>Change password</h2>
                            <input value={sPassword} onChange={(event) => setPassword(event.target.value)} className="form-control" type="password" placeholder="current password" /><br />
                            <input value={sNewPassword} onChange={(event) => setNewPassword(event.target.value)} className="form-control" type="password" placeholder="new password" /><br />
                            <input value={sConfirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="form-control" type="password" placeholder="repeat password" /><br />
                            <input onClick={updatePassword} className="form-control" type="submit" value="Update" />
                        </div>
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