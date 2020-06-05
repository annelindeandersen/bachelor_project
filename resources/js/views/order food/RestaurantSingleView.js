import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import swal from 'sweetalert';

const RestaurantSingleView = () => {
    const location = useLocation();
    const history = useHistory();
    console.log(location);
    const dispatch = useDispatch();

    // logged in user
    const user = useSelector(state => state.usersReducer.user);
    const logout = useSelector(state => state.usersReducer.logout);
    const [sUser, setUser] = useState('');
    console.log({ "REDUX_USER": user, "STATE_USER": sUser });

    const [restaurant, setRestaurant] = useState('');
    const [menu, setMenu] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        setUser(user);
    }, [user])

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
            console.log('user undefined/not logged in');
            swal("Error!", "You must login/register to order food!", "error");
        } else {
            axios.post('/api/addtocart', { user: user && user.id, menu_item: item.id })
                .then(response => {
                    console.log(response);
                    if (response.status === 201) {
                        return swal("Oops!", response.data.error, "warning");
                    }
                    dispatch({ type: 'ITEM_ADDED', item_added: true });
                    dispatch({ type: 'ITEM_ADDED', item_added: false });
                })
                .catch(error => {
                    console.log(error);
                    // swal("Error!", "Something went wrong. Please try again.", "error");
                    swal("Error!", error.message, "error");
                })
        }

    }

    return (
        <div className="container page">
            <div className="singleview-page" style={{ 'backgroundImage': `url(./img/${restaurant ? restaurant.restaurant.image : ''})` }}></div>
            <h1 className="card-header white-font">Restaurant {!restaurant ? '' : restaurant.restaurant.name}</h1>
            <div className="single-view-wrapper">
                <div id="details">
                    <img className="restaurant-logo" src={`./img/${!restaurant ? '' : restaurant.profile.logo}`} alt="logo" />
                    <h3>About:</h3>
                    <p>{!restaurant ? '' : restaurant.profile.description}</p>
                    <h3>Address:</h3>
                    <p>{!restaurant ? '' : restaurant.restaurant.address + ', ' + restaurant.restaurant.city}</p>
                    <h3>Country:</h3>
                    <p>{!restaurant ? '' : restaurant.country.name}</p>
                    <h3>Opening hours:</h3>
                    <p>{!restaurant ? '' : restaurant.profile.opening_hour + ' - ' + restaurant.profile.closing_hour}</p>
                </div>
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
                                    <button className="blue-button" onClick={() => addToCart(item)}>ADD</button>
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
                                    <button className="blue-button" onClick={() => addToCart(item)}>ADD</button>
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
                                    <button className="blue-button" onClick={() => addToCart(item)}>ADD</button>
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
                                    <button className="blue-button" onClick={() => addToCart(item)}>ADD</button>
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
                                    <button className="blue-button" onClick={() => addToCart(item)}>ADD</button>
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
                                    <button className="blue-button" onClick={() => addToCart(item)}>ADD</button>
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
                                    <button className="blue-button" onClick={() => addToCart(item)}>ADD</button>
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
