import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Menu = () => {
    let location = useLocation();
    let history = useHistory();
    const dispatch = useDispatch();
    const logout = useSelector(state => state.usersReducer.logout);

    const logmeout = () => {
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
                dispatch({ type: 'LOGOUT_USER', logout: 'click' });
            }).catch((err) => {
                console.log(err);
            })
    }

    return (
        <nav className="container">
            <div>
                <Link to="/">Home</Link>
            </div>
            {logout === false ? '' :
                <div>
                    <Link to="/login">Login</Link>
                </div>
            }
            {logout === false ? '' :
                <div>
                    <Link to="/register">Register</Link>
                </div>
            }
            {logout === true ? '' :
                <div>
                    <Link to="/profile">Profile</Link>
                </div>
            }
            {logout === true ? '' :
                <div>
                    <button onClick={logmeout}>Logout</button>
                </div>
            }
            {logout === true ? '' :
                <div>
                    <Link to="/cart">Cart</Link>
                </div>
            }
        </nav>
    )
}

export default Menu;

if (document.getElementById('menu')) {
    ReactDOM.render(<Menu />, document.getElementById('menu'));
}