import React from 'react';
import ReactDOM from 'react-dom';

const RestaurantOverview = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="card">
                    <h1 className="card-header">Restaurant Overview</h1>
                    <div>
                        <button className="form-control">Restaurant 1</button>
                        <button className="form-control">Restaurant 2</button>
                        <button className="form-control">Restaurant 3</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RestaurantOverview;

if (document.getElementById('restaurantOverview')) {
    ReactDOM.render(<RestaurantOverview />, document.getElementById('restaurantOverview'));
}
