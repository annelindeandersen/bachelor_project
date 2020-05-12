import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RestaurantOverview = () => {
    const [restaurants, setRestaurants] = useState('');
    const [restaurantCategories, setRestaurantCategories] = useState('');
    const [categories, setCategories] = useState('');
    const [catClick, setCatClick] = useState('');
    const [header, setHeader] = useState('Selected Restaurants');

    console.log({ restaurants, categories, catClick });

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
        <div className="container">
            <div className="row justify-content-center">
                <div className="card">
                    <h1 className="card-header">Select your faveorite food types and choose!</h1>
                    <div className="category-wrapper">
                        {!categories ? '' : categories.data.map((category, index) => (
                            <div key={index}>
                                <button onClick={() => clickCategory({ category })} className="green-button">{category.category}</button>
                            </div>
                        ))}
                    </div>
                    <h1 className="card-header">{header}</h1>
                    <div className="restaurant-wrapper">
                        {catClick === '' ?

                            !restaurants ? '' : restaurants.data.map((restaurant, index) => (
                                <div className="restaurant" key={index}>
                                    <h3>{restaurant.restaurant.name}</h3>
                                    <img className="restaurant-image" src={`./img/${restaurant.restaurant.image}`} />
                                    <div className="button-wrapper">
                                        {restaurant.restaurant.category.map((cat, index) => (<p key={index}>{cat.category}</p>))}
                                        {/* {!restaurantCategories ? '' : restaurantCategories.data.map((res, index) => res.restaurant.category.map((cat, index) => (<p key={index}>{cat.category}</p>)))} */}
                                        <Link to={`/restaurant?id=${restaurant.restaurant.id}`}><button className="green-button">See menu</button></Link>
                                    </div>
                                </div>
                            ))

                            :

                            catClick.restaurant.map((restaurant, index) => (
                                <div className="restaurant" key={index}>
                                    <h3>{restaurant.name}</h3>
                                    <img className="restaurant-image" src={`./img/${restaurant.image}`} />
                                    <div className="button-wrapper">
                                        <p>{catClick.category}</p>
                                        <Link to={`/restaurant?id=${restaurant.id}`}><button className="green-button">See menu</button></Link>
                                    </div>
                                </div>
                            ))

                        }

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
