import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { compose } from 'redux';

const Menu = () => {
    let location = useLocation();
    let history = useHistory();
    const dispatch = useDispatch();
    const logged_out = useSelector(state => state.restaurantsReducer.logged_out);
    console.log(logged_out)
    const logout = (e) => {
        localStorage.removeItem('email');
        dispatch({ type: 'LOGGED_OUT', logged_out: true });
        history.push('/');
    }
    return (
        <>
            {
                location.pathname === '/restaurant-dashboard' ||
                    location.pathname === '/for-restaurants' ||
                    location.pathname === '/restaurant-register' ||
                    location.pathname === '/restaurant-login' ||
                    location.pathname === '/restaurant-password-request' ||
                    location.pathname === '/restaurant-password-reset' ||
                    location.pathname === '/update-profile' ||
                    location.pathname === '/restaurant-profile' ||
                    location.pathname === '/restaurant-orders' ||
                    location.pathname === '/restaurant-menu' ?

                    <nav className="container">
                        <Link to="/">Home</Link>
                        {
                            logged_out === false ? '' :
                                <Link to="/restaurant-login">Login</Link>
                        }
                        {
                            logged_out === true ?
                                <Link to="/restaurant-login">Login</Link> &&
                                <Link to="/restaurant-dashboard">Dashboard</Link> &&
                                <Link to="/restaurant-register">Register</Link> :
                                <button onClick={(e) => logout(e)}>Logout</button>
                        }
                    </nav>
                    :
                    ''
            }
        </>
    )
}

export default Menu;
if (document.getElementById('menu')) {
    ReactDOM.render(<Menu />, document.getElementById('menu'));
}