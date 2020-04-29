import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="card">
                    <h1 className="card-header">Welcome to DELIVR</h1>
                    <div>
                        <Link to="/orderfood"><button className="form-control">ORDER FOOD</button></Link>
                        <button className="form-control">RESTAURANTS</button>
                        <button className="form-control">VOLUNTEERS</button>
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
