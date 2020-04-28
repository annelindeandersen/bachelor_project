import React from 'react';
import ReactDOM from 'react-dom';

const RestaurantSingleView = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="card">
                    <h1 className="card-header">Restaurant</h1>
                </div>
            </div>
        </div>
    );
}

export default RestaurantSingleView;

if (document.getElementById('restaurantSingleView')) {
    ReactDOM.render(<RestaurantSingleView />, document.getElementById('restaurantSingleView'));
}
