import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Dashboard = () => {
    // Redux states
    //  const logout = useSelector(state => state.restaurantsReducer.logout);
    const dispatch = useDispatch();
    const localStorageData = localStorage.getItem('email')
    console.log(`${localStorageData} is from ls`)
    const [message, setMessage] = useState('');
    const [restaurant, setRestaurant] = useState('');
    let history = useHistory();

    //check if logged in session
    useEffect(() => {
        const getRestaurantData = async () => {
            try {
                const response = await fetch(`/api/getRestaurant?id=${localStorageData}`);
                const data = await response.json();
                console.log({ 1: response })
                console.log({ 2: response.data })
                setRestaurant(data.data)
                //    if(response.status === 200){
                //     localStorage.setItem('email', data.local_storage_id);
                //     const sessionData = data.session_data;
                //     // sessionStorage.setItem('email', data.session_data);
                //    }
            } catch (error) {
                console.log(error)
            }
        }
        getRestaurantData();
    }, []);
    return (
        <div className="container">
            <h1>{restaurant.name}</h1>
            <div className="company-details">
                <p>{restaurant.cvr}</p>
                <p>Address:{restaurant.address}</p>
                <p>{restaurant.city}</p>
                <p>{restaurant.postcode}</p>
                <p>Phone: {restaurant.phone}</p>
                <p>Email: {restaurant.email}</p>
            </div>
            <Link to="/restaurant-profile"><button className="form-control">CREATE PROFILE</button></Link>
            <Link to="/restaurant-menu"><button className="form-control">CREATE MENU</button></Link>
            <Link to="/restaurant-orders"><button className="form-control">ORDERS</button></Link>
        </div>
    );
}
export default Dashboard;
if (document.getElementById('dashboard')) {
    ReactDOM.render(<Dashboard />, document.getElementById('dashboard'));
}
