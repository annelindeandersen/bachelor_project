import React from 'react';
import ReactDOM from 'react-dom';

const Home = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="card">
                    <h1 className="card-header">Welcome to DELIVR</h1>
                    <div>
                        <button className="form-control">ORDER FOOD</button>
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
