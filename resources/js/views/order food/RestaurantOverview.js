import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const RestaurantOverview = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="card">
                    <h1 className="card-header">Select your faveorite food types and choose!</h1>
                    <div>
                        <Link to="/restaurant?category=vegetarian"><button>Vegetarian</button></Link>
                        <Link to="/restaurant?category=vegan"><button>Vegan</button></Link>
                        <Link to="/restaurant?category=italian"><button>Italian</button></Link>
                        <Link to="/restaurant?category=japanese"><button>Japanese</button></Link>
                        <Link to="/restaurant?category=mexican"><button>Mexican</button></Link>
                        <Link to="/restaurant?category=thai"><button>Thai</button></Link>
                        <Link to="/restaurant?category=pizza"><button>Pizza</button></Link>
                        <Link to="/restaurant?category=burgers"><button>Burgers</button></Link>
                        <Link to="/restaurant?category=sushi"><button>Sushi</button></Link>
                    </div>
                    <h1 className="card-header">Selected restaurants</h1>
                    <div>
                        <div>
                            <b>Vegetarian</b>
                            <Link to="/restaurant?id=1"><button className="form-control">Restaurant 1</button></Link>
                        </div>
                        <div>
                            <b>Pizza</b>
                            <Link to="/restaurant?id=2"><button className="form-control">Restaurant 2</button></Link>
                        </div>
                        <div>
                            <b>Burger</b>
                            <Link to="/restaurant?id=3"><button className="form-control">Restaurant 3</button></Link>
                        </div>
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
