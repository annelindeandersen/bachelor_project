import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const RestaurantSingleView = () => {
    const location = useLocation();
    console.log(location);

    // logged in user
    const user = useSelector(state => state.usersReducer.user);
    const logout = useSelector(state => state.usersReducer.logout);
    console.log(user);

    const [restaurant, setRestaurant] = useState('');
    const [menu, setMenu] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (logout === 'click') {
            console.log('Logout is clicked')
            history.push('/login');
        }
    }, [logout])

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

    const addToCart = (item) => {
        console.log(item);
        console.log(user);

        if (!user || user === undefined) {
            console.log('cannot add');
            setError('Sorry, you must login/register to order food!');
        } else {
            axios.post('/api/addtocart', { user: user.id, menu_item: item.id })
                .then(response => {
                    console.log(response);
                    setMessage('Item was added to cart!');
                })
                .catch(error => {
                    console.log(error);
                })
        }

    }

    return (
        <div className="container">
            <h1 className="card-header">Restaurant {!restaurant ? '' : restaurant.restaurant.name}</h1>
            <div className="single-view-wrapper">
                <div id="details">
                    <img src={`./img/${!restaurant ? '' : restaurant.profile.logo}`} alt="logo" />
                    <h4>About:</h4>
                    <p>{!restaurant ? '' : restaurant.profile.description}</p>
                    <h4>Address:</h4>
                    <p>{!restaurant ? '' : restaurant.restaurant.address + ', ' + restaurant.restaurant.city}</p>
                    <h4>Country:</h4>
                    <p>{!restaurant ? '' : restaurant.country.name}</p>
                    <h4>Opening hours:</h4>
                    <p>{!restaurant ? '' : restaurant.profile.opening_hour + ' - ' + restaurant.profile.closing_hour}</p>
                </div>
                {!menu ? '' :
                    <div id="menu">
                        <p>{error}</p><p>{message}</p>
                        {/* get starter dishes */}
                        <div className="menu-type" id="starters">
                            <h3>{menu.data[0].starter[1].length === 0 ? '' : menu.data[0].starter[0]}</h3>
                            {menu.data[0].starter[1].map((item, index) => (
                                <div className="menu-item" key={index}>
                                    <div><h5>{item.title}</h5>
                                        <p>{item.description}</p>
                                        <strong>{item.price} DKK</strong>
                                    </div>
                                    <button className="green-button" onClick={() => addToCart(item)}>ADD</button>
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
                                    <button className="green-button" onClick={() => addToCart(item)}>ADD</button>
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
                                    <button className="green-button" onClick={() => addToCart(item)}>ADD</button>
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
                                    <button className="green-button" onClick={() => addToCart(item)}>ADD</button>
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
                                    <button className="green-button" onClick={() => addToCart(item)}>ADD</button>
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
                                    <button className="green-button" onClick={() => addToCart(item)}>ADD</button>
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
                                    <button className="green-button" onClick={() => addToCart(item)}>ADD</button>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default RestaurantSingleView;

if (document.getElementById('restaurantSingleView')) {
    ReactDOM.render(<RestaurantSingleView />, document.getElementById('restaurantSingleView'));
}
