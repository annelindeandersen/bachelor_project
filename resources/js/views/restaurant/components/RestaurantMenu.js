import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


const Menu = () => {
    let location = useLocation();
    let history = useHistory();
    const dispatch = useDispatch();

    const logout = (e) => {
        localStorage.removeItem('email');
        if (localStorage.getItem("email") === null) {
             history.push('/');
          }
           
    
    }

    

    return (
        <>
        {
           
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
                    <div className="logo-container">
                        <Link to="/"><img src="./img/delivr-3.png" alt="logo" /></Link>
                    </div>
                    {
                        localStorage.getItem("email") === null ?  
                            <Link to="/restaurant-login">Login</Link>&&
                            <Link to="/restaurant-register">Register</Link>
                        : ''
                    }
                    {
                        localStorage.getItem("email") !== null ?
                            <Link to="/restaurant-dashboard">Dashboard</Link> &&
                            <Link to="/" onClick={(e) => logout(e)}>Logout</Link> : ''
                    }
                </nav>
                :
                ''
        }
    </>
    )
}

export default Menu;
