import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const RestaurantOverview = () => {
    const [restaurants, setRestaurants] = useState('');
    const [restaurantCategories, setRestaurantCategories] = useState('');
    const [categories, setCategories] = useState('');
    const [catClick, setCatClick] = useState('');
    const [header, setHeader] = useState('All Restaurants');
    const logout = useSelector(state => state.usersReducer.logout);
    const history = useHistory();

    console.log({ restaurants, categories, catClick });

    useEffect(() => {
        if (logout === 'click') {
            console.log('Logout is clicked')
            history.push('/login');
        }
    }, [logout])

    useEffect(() => {
        // get categories
        axios.get('/api/getcategories')
            .then(response => {
                console.log(response.data);
                setCategories(response);
            }).catch((err) => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        // get restaurants
        axios.get('/api/getrestaurants')
            .then(response => {
                console.log(response);
                setRestaurants(response);
                setRestaurantCategories(response);
            }).catch((err) => {
                console.log(err);
            })
    }, [])

    const clickCategory = ({ category }) => {
        // get category clicked
        console.log('clicked', category.category);

        axios.get('/api/getcategory', { params: { category: category.category } })
            .then(response => {
                console.log(response);
                setCatClick(response.data[0]);
                setHeader(response.data[0].category + ' Restaurants');
            }).catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className="container page">
            <div className="restaurant-page"></div>
            <div className="category-wrapper">
                <button onClick={() => { setCatClick(''); setHeader('All Restaurants') }} className="blue-button all">ALL</button>
                {!categories ? '' : categories.data.map((category, index) => (
                    <div key={index}>
                        <button onClick={() => clickCategory({ category })} className="blue-button">{category.category}</button>
                    </div>
                ))}
            </div>
            <h1 className="">{header}</h1>
            <div className="restaurant-wrapper">
                {catClick === '' ?

                    !restaurants ? '' : restaurants.data.map((restaurant, index) => (
                        <Link to={`/restaurant?id=${restaurant.restaurant.id}`} key={index} style={{ 'textDecoration': 'none' }} >
                            <div className="restaurant">
                                <h3>{restaurant.restaurant.name}</h3>
                                <img className="restaurant-image" src={restaurant.restaurant.image} alt={restaurant.restaurant.image} />
                                {/* <img className="restaurant-image" src={`./img/${restaurant.restaurant.image}`} /> */}
                                <div className="category-restaurant-wrapper">
                                    {restaurant.restaurant.category.map((cat, index) => (<p className="category-types" key={index}>{cat.category}</p>))}
                                </div>
                            </div>
                        </Link>
                    ))

                    :

                    catClick.restaurants.map((restaurant, index) => (
                        <Link to={`/restaurant?id=${restaurant.id}`} key={index} style={{ 'textDecoration': 'none' }}>
                            <div className="restaurant">
                                <h3>{restaurant.name}</h3>
                                <img className="restaurant-image" src={restaurant.image} alt={restaurant.image} />
                                {/* <img className="restaurant-image" src={`./img/${restaurant.image}`} /> */}
                                <div className="category-restaurant-wrapper">
                                    {/* <p>{catClick.category}</p> */}
                                    {restaurant.category.map((cat, index) => (<p className="category-types" key={index}>{cat.category}</p>))}
                                </div>
                            </div>
                        </Link>
                    ))

                }

            </div>
        </div>
    );
}

export default RestaurantOverview;

if (document.getElementById('restaurantOverview')) {
    ReactDOM.render(<RestaurantOverview />, document.getElementById('restaurantOverview'));
}
