import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
            <div className="page background">
            <div className="home-container container">
                <div>
                    <h1 className="logo text-center pt-5">DELIVR</h1>
                    <div className="home-text">
                        <h1 className=" title pt-5 pb-4">Welcome to the Food App!</h1>
                        <p className="body-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

                    </div>
                    <div className="home-options">
                    <Link to="/orderfood"className="home-menu">order food</Link>
                    <Link to="/for-restaurants"  className="home-menu">
                        <span className="menu-small">for</span>
                        <span>restaurants</span>
                    </Link>
                    <Link to="/volunteers" className="home-menu">
                    <span className="menu-small">for</span>
                                <span>volunteers</span>
                    </Link>
                    </div>
                </div>
                </div>
            </div>
    );
}

export default Home;

if (document.getElementById('home')) {
    ReactDOM.render(<Home />, document.getElementById('home'));
}
