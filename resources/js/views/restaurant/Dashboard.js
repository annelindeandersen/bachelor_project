import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import swal from 'sweetalert';

const Dashboard = () => {
    // Redux states
    const restaurantData = useSelector(state => state.restaurantsReducer.restaurant); 
    console.log(restaurantData ? restaurantData.name : '')  
    let history = useHistory();
    const localStorageData = localStorage.getItem('email');
    // const [restaurant, setRestaurant] = useState('');
    const  [date, setDate] = useState(new Date().toLocaleString())




    return (
        <div className="green-bg dashboard-page">
                <Link to="/" >
                    <img id="logo" src="./img/delivr-3.png" alt="logo" className="dashboard-logo"/>
                </Link>
            <div className="container dashboard-container">

<div className="row">
  <div className="col">
    <div>
        <h1>Welcome {restaurantData ? restaurantData.name : ''}</h1>
        <p>View your latest activity and update your settings and keep your customers updated with your latest menu and exciting food offering.</p>
    </div>
  </div>
</div>
<div className="row">
  <div className="col-8">
        <Link to="/restaurant-orders"  style={{ textDecoration: 'none' }} >
            <div className="dashboard-link">
                <h2>Orders</h2>
                <p>You have no orders at the moment..</p>
            </div>
        </Link>
  </div>
  <div className="col-4">
    <Link to="/restaurant-menu"  style={{ textDecoration: 'none' }} >
        <div className="dashboard-link">
            <h2>Menu</h2>
            <p>View your menu and keep in updated</p>
        </div>
    </Link>
  </div>
</div>
<div className="row mt-4">
  <div className="col">
  <div className="dashboard-link">
            <h2>8°</h2>
            <p>Cloudy</p>
        </div>
  </div>
  <div className="col">
        <div className="dashboard-link">
            <h3>{date}</h3>
        </div>

  </div>
  <div className="col-8">
    <Link to="/restaurant-profile"  style={{ textDecoration: 'none' }} >
        <div className="dashboard-link">
            <h2>Profile</h2>
            <p>Are your profile details up to date?</p>
        </div>
    </Link>
  </div>
</div>
<div className="row mt-4">
  <div className="col">
  <div className="dashboard-link">
            <h2>INBOX</h2>
            <p>New Messages</p>
        </div>
  </div>
  <div className="col">
        <div className="dashboard-link">
            <h2>NEWS</h2>
            <p>Latest recommendatons on how to keep your staff safe during covid19</p>
        </div>
  </div>
  <div className="col">
    <Link to="/update-profile"  style={{ textDecoration: 'none' }}>
        <div className="dashboard-link">
            <h2>PROFILE SETTINGS</h2>
            <p></p>
        </div>
    </Link>
  </div>
</div>
         
        
              
         
          
            
          
            </div>
        </div>
        
    );
}

export default Dashboard;
if (document.getElementById('dashboard')) {
    ReactDOM.render(<Dashboard />, document.getElementById('dashboard'));
}