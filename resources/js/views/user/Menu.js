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
        <>
            {location.pathname === '/payment' ? '' :
                <nav className="container">
                    <div>
                        <Link to="/">
                            <img id="logo" src="./img/delivr-3.png" alt="logo" />
                        </Link>
                    </div>
                    <div className="menu-items">
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
                                <Link to="/orderfood">Food</Link>
                            </div>
                        }
                        {logout === true ? '' :
                            <div>
                                <Link to="/profile">Profile</Link>
                            </div>
                        }
                        {logout === true ? '' :
                            <div>
                                <Link to="/cart">Cart</Link>
                            </div>
                        }
                        {logout === true ? '' :
                            <div>
                                <div onClick={logmeout}>Logout</div>
                            </div>
                        }
                    </div>
                </nav>
            }
        </>
    )
}

export default Menu;

if (document.getElementById('menu')) {
    ReactDOM.render(<Menu />, document.getElementById('menu'));
}