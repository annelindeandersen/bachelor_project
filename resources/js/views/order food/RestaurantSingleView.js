import React from 'react';
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom';

const RestaurantSingleView = () => {
    const location = useLocation();
    console.log(location);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="card">
                    <h1 className="card-header">Restaurant {location.search.replace('?id=', '')}</h1>
                    <h2>Menu</h2>
                </div>
            </div>
        </div>
    );
}

export default RestaurantSingleView;

if (document.getElementById('restaurantSingleView')) {
    ReactDOM.render(<RestaurantSingleView />, document.getElementById('restaurantSingleView'));
}
