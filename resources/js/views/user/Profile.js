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
    const [settingsComponent, setSettingsComponent] = useState(true);
    const [orderComponent, setOrderComponent] = useState(false);
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
    const [orderDetails, setOrderDetails] = useState([]);

    const [userLoaded, setUserLoaded] = useState('');
    const [message, setMessage] = useState('');
    const [order, setOrder] = useState('');
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
                console.log(response.data);
                dispatch({ type: 'LOGOUT_USER', logout: false });
                dispatch({ type: 'CURRENT_USER', user: response.data });
                dispatch({ type: 'USER_TOKEN', token: localStorage.getItem('token') });
            }).catch((err) => {
                console.log(err);
                history.push('/login');
            })
    }, [])

    useEffect(() => {
        if (user) {
            setFirstName(user.first_name);
            setLastName(user.last_name);
            setEmail(user.email);
            setPhone(user.phone);
            setAddress(user.address);
            setCity(user.city);
            setPost(user.postcode);
            setUserLoaded(user);
        }
    }, [user])

    useEffect(() => {
        if (logout === 'click') {
            console.log('Logout is clicked')
            // dispatch({ type: 'LOGOUT_USER', logout: false });
            history.push('/login');
        }
    }, [logout])


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

    const orderClick = () => {
        console.log('order click');
        setOrderComponent(true);
        setSettingsComponent(false);
        setPasswordComponent(false);
    }

    const settingsClick = () => {
        console.log('settings click');
        setSettingsComponent(true);
        setOrderComponent(false);
        setPasswordComponent(false);
    }

    const passwordClick = () => {
        console.log('password click');
        setPasswordComponent(true);
        setSettingsComponent(false);
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
            setMessage('Your profile was updated!');
        }).catch(error => {
            console.log(error);
            setMessage('Something went wrong. Try updating again.');
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

    const toggleOrder = ({ item }) => {
        // create array to push or remove clicked orders to
        const orderArray = [...orderDetails];

        if (item.id) {
            const clickedOrder = orderArray.indexOf(item.id);
            console.log(clickedOrder);

            if (clickedOrder >= 0) {
                orderArray.splice(clickedOrder, 1);
            } else {
                orderArray.push(item.id);
            }
            setOrderDetails(orderArray);
            console.log(orderArray)
        }
    }


    return (
        <div className="container page">
            <div className="profile-page"></div>
            {userLoaded === '' ? 'Please try again. Something went wrong.' :
                <div>
                    <div id="profileClick">
                        <div onClick={settingsClick} className={classNames({ 'inactive': !settingsComponent, 'active': settingsComponent, '2opacity-0': !settingsComponent, '2opacity-1': settingsComponent }, 'header-profile')}>
                            <img src="./img/001-user.svg" alt="dddd" />
                            <h4>Profile</h4>
                        </div>
                        <div onClick={orderClick} className={classNames({ 'inactive': !orderComponent, 'active': orderComponent, '2opacity-0': !orderComponent, '2opacity-1': orderComponent }, 'header-order')}>
                            <img src="./img/008-noodles.svg" alt="dddd" />
                            <h4>Orders</h4>
                        </div>
                        <div onClick={passwordClick} className={classNames({ 'inactive': !passwordComponent, 'active': passwordComponent, '2opacity-0': !passwordComponent, '2opacity-1': passwordComponent }, 'header-password')}>
                            <img src="./img/004-key.svg" alt="dddd" />
                            <h4>Change password</h4>
                        </div>
                    </div>
                    <div id="profileWrapper">
                        <div className={classNames({ 'opacity-0': !settingsComponent, 'opacity-1': settingsComponent }, 'profile-component')}>
                            <h2>Profile details</h2>
                            <p>{message}</p>
                            <div className="detail-wrap">
                                <div>
                                    <label>FIRST NAME</label>
                                    <input value={sFirstName} onChange={(event) => setFirstName(event.target.value)} className="underline-input" type="text" placeholder="change first name" />
                                </div>
                                <div>
                                    <label>LAST NAME</label>
                                    <input value={sLastName} onChange={(event) => setLastName(event.target.value)} className="underline-input" type="text" placeholder="change last name" />
                                </div>
                            </div>
                            <div className="detail-wrap">
                                <div>
                                    <label>EMAIL</label>
                                    <input value={sEmail} onChange={(event) => setEmail(event.target.value)} className="underline-input" type="text" placeholder="change email" />
                                </div>
                                <div>
                                    <label>PHONE</label>
                                    <input value={sPhone} onChange={(event) => setPhone(event.target.value)} className="underline-input" type="integer" placeholder="change phone number" />
                                </div>
                            </div>
                            <div>
                                <label>ADDRESS</label>
                                <input value={sAddress} onChange={(event) => setAddress(event.target.value)} className="underline-input" type="text" placeholder="change address" />
                            </div>
                            <div className="detail-wrap">
                                <div>
                                    <label>CITY</label>
                                    <input value={sCity} onChange={(event) => setCity(event.target.value)} className="underline-input" type="text" placeholder="change city" />
                                </div>
                                <div>
                                    <label>POST CODE</label>
                                    <input value={sPost} onChange={(event) => setPost(event.target.value)} className="underline-input" type="text" placeholder="change postal code" />
                                </div>
                            </div>
                            <br />
                            <input onClick={updateProfile} className="form-control blue-button" type="submit" value="Update" />
                        </div>
                        <div className={classNames({ 'opacity-0': !orderComponent, 'opacity-1': orderComponent }, 'order-component')}>
                            <h2>Your orders:</h2>
                            {order && order.data.map((item, index) => (
                                <div className="order-item" key={index} onClick={() => toggleOrder({ item })}>
                                    <div className="order">
                                        <div className="order-head">
                                            <b>Order ID: {item.id}</b>
                                            <b>{item.restaurant.name}</b>
                                            <b>{item.delivery_time}</b>
                                            <b>{item.total_amount} DKK</b>
                                        </div>
                                    </div>
                                    <div className={classNames({ 'visible': orderDetails.indexOf(item.id) >= 0 }, "order-details")}>
                                        <div className="detail-head">
                                            <h4>Order items:</h4>
                                        </div>
                                        {item.order_item.map((order_detail, index) => (
                                            <div className="detail-info" key={index}>
                                                {/* <div className={classNames({ 'visible': orderDetails.indexOf(item.order.id) >= 0 }, "detail-info")} key={index}> */}
                                                <p>{order_detail.menu_item.title}</p>
                                                <p>{order_detail.menu_item.price} DKK</p>
                                            </div>
                                        ))}
                                        <div className="accepted">
                                            <i>{item.accepted === 0 ? `Your order has been sent to ${item.restaurant.name}.` : `Your order has been accepted by ${item.restaurant.name}.`}</i><br />
                                            <div className="status"><b>Status: </b><p>{item.status === 0 ? 'Order pending' : 'Order has been sent.'}</p></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={classNames({ 'opacity-0': !passwordComponent, 'opacity-1': passwordComponent }, 'password-component')}>
                            <h2>Change password</h2>
                            <br />
                            <div>
                                <label>CURRENT PASSWORD</label>
                                <input value={sPassword} onChange={(event) => setPassword(event.target.value)} className="underline-input" type="password" placeholder="current password" />
                            </div>
                            <div>
                                <label>NEW PASSWORD</label>
                                <input value={sNewPassword} onChange={(event) => setNewPassword(event.target.value)} className="underline-input" type="password" placeholder="new password" />
                            </div>
                            <div>
                                <label>CONFIRM PASSWORD</label>
                                <input value={sConfirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="underline-input" type="password" placeholder="confirm password" />
                            </div>
                            <br />
                            <input onClick={updatePassword} className="form-control blue-button" type="submit" value="Update" />
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