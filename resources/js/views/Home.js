import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="page container">
            <div className="row justify-content-center">
                <div className="card">
                    <h1 className="card-header">Welcome to DELIVR</h1>
                    <div>
                        <Link to="/orderfood"><button className="form-control">ORDER FOOD</button></Link>
                        <Link to="/for-restaurants"><button className="form-control">RESTAURANTS</button></Link>
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
