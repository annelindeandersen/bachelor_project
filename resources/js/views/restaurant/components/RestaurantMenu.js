import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { compose } from 'redux';


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
        <nav className="restaurant-nav d-flex justify-content-between">
            <div className="">
                <Link to="/">
                    <img id="logo" src="./img/delivr-3.png" alt="logo" />
                </Link>
            </div>
            <div>
            {
                localStorage.getItem("email") === null ? <Link to="/restaurant-login">Login</Link> : '' 
                    
            }
            {
                localStorage.getItem("email") === null ? <Link to="/restaurant-register">Register</Link> : ''
                
            }
            {
                localStorage.getItem("email") != null ? <Link to="/restaurant-dashboard">Dashboard</Link> : ''
                
            }
             {
                localStorage.getItem("email") != null ? <Link to="/" onClick={(e) => logout(e)}>Logout</Link> : ''
                
            }
         </div>
        </nav>
    )
}

export default Menu;
