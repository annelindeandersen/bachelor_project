import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import Orders from './Orders';
import Menu from './RestaurantMenu';
import RestaurantDetails from './RestaurantDetails';


const Dashboard = () => {
  // Redux states
  //  const logout = useSelector(state => state.restaurantsReducer.logout);
  
  const dispatch = useDispatch();
  let history = useHistory();

  const localStorageData = localStorage.getItem('email');

  const [restaurant, setRestaurant] = useState('');

      // component states
      const [profileComponent, setProfileComponent] = useState(false);
      const [ordersComponent, setOrdersComponent] = useState(true);
      const [menuComponent, setMenuComponent] = useState(false);

      const getProfile = () => {
        console.log('getting the profile')
        setProfileComponent(true);
        setMenuComponent(false);
        setOrdersComponent(false);
      }

      const getOrders = ()=>{
        console.log('getting the orders');
        setProfileComponent(false);
        setMenuComponent(false);
        setOrdersComponent(true);
    }

    const getMenu = ()=>{
        console.log('getting menu');
        setProfileComponent(false);
        setMenuComponent(true);
        setOrdersComponent(false);
    }

    // //check if logged in session
    // useEffect(() => {
    //     const getRestaurantData = async () => {
    //         try {
    //             const response = await fetch(`/api/getRestaurant/${localStorageData}`);
    //             const data = await response.json();
    //             console.log(data)
    //             setRestaurant(data.restaurant)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     getRestaurantData();
    // }, []);

    return (
        <div className="container">
        <ul>     
            <li onClick={getOrders}>Orders</li>
            <li onClick={getMenu}>Menu</li>
            <li onClick={getProfile}>Profile</li>
        </ul>
    
            <div className={classNames({ 'hidden': !profileComponent, 'visible': profileComponent })}>
                <RestaurantDetails />
            </div>

            <div className={classNames({ 'hidden': !ordersComponent, 'visible': ordersComponent })}>
               <Orders />
            </div>

            <div className={classNames({ 'hidden': !menuComponent, 'visible': menuComponent })}>
                <Menu />
            </div>
        </div>
    );
}
export default Dashboard;
if (document.getElementById('dashboard')) {
    ReactDOM.render(<Dashboard />, document.getElementById('dashboard'));
}
