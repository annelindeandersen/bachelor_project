import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const RestaurantSingleView = () => {
    const location = useLocation();
    console.log(location);

    const [restaurant, setRestaurant] = useState('');
    const [menu, setMenu] = useState('');

    useEffect(() => {
        axios.get('/api/getselected', { params: { id: location.search.replace('?id=', '') } })
            .then(response => {
                console.log(response.data);
                setRestaurant(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        axios.get('/api/getmenu', { params: { id: location.search.replace('?id=', '') } })
            .then(response => {
                console.log(response.data);
                setMenu(response);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="card">
                    <h1 className="card-header">Restaurant {!restaurant ? '' : restaurant.restaurant.name}</h1>
                    <h2>Menu</h2>
                    {!menu ? '' :
                        <div id="menu">
                            {/* get starter dishes */}
                            <div className="menu-type" id="starters">
                                <h3>{menu.data[0].starter[1].length === 0 ? '' : menu.data[0].starter[0]}</h3>
                                {menu.data[0].starter[1].map((item, index) => (
                                    <div className="menu-item" key={index}>
                                        <div><h5>{item.title}</h5>
                                            <p>{item.description}</p>
                                            <strong>{item.price} DKK</strong>
                                        </div>
                                        <button className="green-button">ADD</button>
                                    </div>
                                ))}
                            </div>
                            {/* get snack dishes */}
                            <div className="menu-type" id="snacks">
                                <h3>{menu.data[0].snack[1].length === 0 ? '' : menu.data[0].snack[0]}</h3>
                                {menu.data[0].snack[1].map((item, index) => (
                                    <div className="menu-item" key={index}>
                                        <div><h5>{item.title}</h5>
                                            <p>{item.description}</p>
                                            <strong>{item.price} DKK</strong>
                                        </div>
                                        <button className="green-button">ADD</button>
                                    </div>
                                ))}
                            </div>
                            {/* get main dishes */}
                            <div className="menu-type" id="mains">
                                <h3>{menu.data[0].main[1].length === 0 ? '' : menu.data[0].main[0]}</h3>
                                {menu.data[0].main[1].map((item, index) => (
                                    <div className="menu-item" key={index}>
                                        <div><h5>{item.title}</h5>
                                            <p>{item.description}</p>
                                            <strong>{item.price} DKK</strong>
                                        </div>
                                        <button className="green-button">ADD</button>
                                    </div>
                                ))}
                            </div>
                            {/* get food dishes */}
                            <div className="menu-type" id="food">
                                <h3>{menu.data[0].food[1].length === 0 ? '' : menu.data[0].food[0]}</h3>
                                {menu.data[0].food[1].map((item, index) => (
                                    <div className="menu-item" key={index}>
                                        <div><h5>{item.title}</h5>
                                            <p>{item.description}</p>
                                            <strong>{item.price} DKK</strong>
                                        </div>
                                        <button className="green-button">ADD</button>
                                    </div>
                                ))}
                            </div>
                            {/* get dessert dishes */}
                            <div className="menu-type" id="desserts">
                                <h3>{menu.data[0].dessert[1].length === 0 ? '' : menu.data[0].dessert[0]}</h3>
                                {menu.data[0].dessert[1].map((item, index) => (
                                    <div className="menu-item" key={index}>
                                        <div><h5>{item.title}</h5>
                                            <p>{item.description}</p>
                                            <strong>{item.price} DKK</strong>
                                        </div>
                                        <button className="green-button">ADD</button>
                                    </div>
                                ))}
                            </div>
                            {/* get beverages */}
                            <div className="menu-type" id="beverages">
                                <h3>{menu.data[0].beverage[1].length === 0 ? '' : menu.data[0].beverage[0]}</h3>
                                {menu.data[0].beverage[1].map((item, index) => (
                                    <div className="menu-item" key={index}>
                                        <div><h5>{item.title}</h5>
                                            <p>{item.description}</p>
                                            <strong>{item.price} DKK</strong>
                                        </div>
                                        <button className="green-button">ADD</button>
                                    </div>
                                ))}
                            </div>
                            {/* get extra dishes */}
                            <div className="menu-type" id="extras">
                                <h3>{menu.data[0].extra[1].length === 0 ? '' : menu.data[0].extra[0]}</h3>
                                {menu.data[0].extra[1].map((item, index) => (
                                    <div className="menu-item" key={index}>
                                        <div><h5>{item.title}</h5>
                                            <p>{item.description}</p>
                                            <strong>{item.price} DKK</strong>
                                        </div>
                                        <button className="green-button">ADD</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default RestaurantSingleView;

if (document.getElementById('restaurantSingleView')) {
    ReactDOM.render(<RestaurantSingleView />, document.getElementById('restaurantSingleView'));
}
