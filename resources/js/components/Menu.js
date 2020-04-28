import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Menu = () => {
    let location = useLocation();
    let history = useHistory();
    const dispatch = useDispatch();
    const users = useSelector(state => state.usersReducer.users);

    const logout = () => {
        const authOptions = {
            method: 'GET',
            url: '/api/auth/logout',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        axios(authOptions)
            .then(response => {
                console.log(response);
                localStorage.removeItem('token');
                dispatch({ type: 'LOGOUT_USER', logout: true });
            }).catch((err) => {
                console.log(err);
            })
    }

    return (
        <nav className="container">
            <div>
                <Link to="/">Home</Link>
            </div>
            {location.pathname === '/profile' ? '' :
                <div>
                    <Link to="/login">Login</Link>
                </div>
            }
            {location.pathname === '/profile' ? '' :
                <div>
                    <Link to="/register">Register</Link>
                </div>
            }
            {location.pathname === '/login' || location.pathname === '/register' ? '' :
                <div>
                    <button onClick={logout}>Logout</button>
                </div>
            }
        </nav>
    )
}

export default Menu;

if (document.getElementById('menu')) {
    ReactDOM.render(<Menu />, document.getElementById('menu'));
}