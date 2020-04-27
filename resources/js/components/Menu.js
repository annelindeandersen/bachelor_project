import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <nav>
            <div className="container">
            <div className="logo">
              <Link to="/">DELIVR</Link>
            </div>
                
            <div className="d-flex flex-row justify-content-end">
                <div className="nav-links">
                    <Link to="/">Home</Link>
                </div>
                <div className="nav-links">
                    <Link to="/login">Login</Link>
                </div>
                <div className="nav-links">
                    <Link to="/register">Register</Link>
                </div>
            </div>
            </div>
        </nav>
    )
}

export default Menu;

if (document.getElementById('menu')) {
    ReactDOM.render(<Menu />, document.getElementById('menu'));
}