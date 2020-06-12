import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import swal from 'sweetalert';
import Moment from 'react-moment';


const Dashboard = () => {
    // Redux states
    const restaurant = useSelector(state => state.restaurantsReducer.restaurant); 
    const order_accepted = useSelector(state => state.ordersReducer.order_accepted_status);
    const order_in_progress = useSelector(state => state.ordersReducer.in_progress_status);
    const order_ready = useSelector(state => state.ordersReducer.ready_for_dispatch_status);
    const profile_updated = useSelector(state => state.restaurantsReducer.profile_updated);
    const logged_out = useSelector(state => state.restaurantsReducer.logged_out);

    const [aReceivedOrders, setReceivedOrders] = useState();
    console.log({5:restaurant ? restaurant : 'got nuthing'})  
    let history = useHistory();
    const dispatch = useDispatch();

    const localStorageData = localStorage.getItem('email');
    // const [restaurant, setRestaurant] = useState('');
    const date = new Date();
   
    const [iID, setID] = useState('');
    const [sName, setName] = useState('');
    const [sEmail, setEmail] = useState('');
    const [sPhone, setPhone] = useState('');
    const [sAddress, setAddress] = useState('');
    const [sCity, setCity] = useState('');
    const [sPostcode, setPostcode] = useState('');
    const [sCountry, setCountry] = useState('');
    const [sDescription, setDescription] = useState('');
    const [sBannerUrl, setBannerUrl]= useState('');
    const [sLogoUrl, setLogoUrl] = useState('');
    const [sOpeningHour, setOpeningHour] = useState('');
    const [sClosingHour, setClosingHour] = useState('');
    const [aCategories, setCategories] = useState([]);
    const [aCheckedItems, setCheckedItems] = useState({
        selected: []
    });
    const [checked, setChecked] = useState(false)

      //GET RESTAURANT FROM DB
      useEffect(() => {
        axios.get('/api/getRestaurant', { params: { id: localStorageData } })
            .then(response => {
                console.log({ 'RESTAURANT_DATA': response.data })
                setID(response.data.restaurant.id);
                setName(response.data.restaurant.name);
                setPhone(response.data.restaurant.phone);
                setEmail(response.data.restaurant.email);
                setAddress(response.data.restaurant.address);
                setCity(response.data.restaurant.city);
                setPostcode(response.data.restaurant.postcode);
                sDescription ? setDescription(response.data.restaurant.profile.description) : '';
                sOpeningHour ? setOpeningHour(response.data.restaurant.profile.opening_hour) : '';
                sClosingHour ? setClosingHour(response.data.restaurant.profile.closing_hour) : '';
                sLogoUrl ? setLogoUrl(response.data.restaurant.profile.logo) : '';
                sBannerUrl ? setBannerUrl(response.data.restaurant.image) : '';
            })
            .catch(error => {
                console.log(error);
            })
    }, [])


    //check if logged in
useEffect(() => {
    const checkAuth = () => {
        if (localStorage.getItem("email") === null) {
             history.push('/');
          }
    }
    checkAuth()
}, [])

 
    const logout = () => {
        localStorage.removeItem('email');
        if (localStorage.getItem("email") === null) {
            dispatch({ type: 'CURRENT_USER', restaurant: '' });
            dispatch({ type: 'LOGGED_OUT',logged_out: true });
             history.push('/');
          }
    }


        //get new orders
        useEffect(() => {
            console.log(!restaurant && restaurant)
            axios.get('/api/getNewOrders', { params: { id: iID } })
                .then(response => {
                    setReceivedOrders(response.data);
                })
                .catch(error => {
                    console.log(error)
                })
        }, [restaurant, order_accepted, order_in_progress, order_ready]);
      
    
    
    
      

    return (

        <div className="green-bg dashboard-page">
                <Link to="/" >
                    <img id="logo" src="./img/delivr-3.png" alt="logo" className="dashboard-logo"/>
                </Link>
            <div className="container dashboard-container">
                <div className="row">
                    <div className="col dash-col">
                        <div>
                            <h1 className="text-center">Hello {sName}</h1>
                            <Link to="/" onClick={(e) => logout(e)} className="float-right grey-btn mb-3 logout-link">Logout</Link>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-8 dash-col">
                    <div className="row">
                        <div className="col-8 dash-col">
                                    <div className="dashboard-link">
                                        <h3>New Orders</h3>
                                        {aReceivedOrders ?         
                                        <ul className="list-group list-group-flush orders-list overflow-auto">
                                                    {aReceivedOrders && aReceivedOrders.slice(0, 3).map((order, i) => (
                                                <li key={i} className="list-group-item  pb-5">
                                                    <h5>Delivery date: {order.delivery_time}</h5>
                                                    <h5>Total price: {order.total_amount},-</h5>
                                                    <p>Customer name: {order.user.first_name} {order.user.last_name}</p>
                                                </li>
                                            ))}
                                                </ul> : <p>You have no orders at the moment..</p>}
                                                <Link to="/restaurant-orders"  style={{ textDecoration: 'none' }}>View all your orders</Link>
                                    </div>
                        </div>
                        <div className="col-4 pr-5">
                                <div className="dashboard-link">
                                <Moment format='dddd'>{date}</Moment><br/>
                                <Moment format= 'MMMM Do YYYY'>{date}</Moment>< br/>
                                <h2><Moment format= 'LT'>{date}</Moment></h2>
                                </div>
                                <div className="dashboard-link mt-5">
                                <Link to="/restaurant-menu"  style={{ textDecoration: 'none' }}><h3>Menu</h3></Link>
                                <p>View and update your menu</p>
                            
                                </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-4 dash-col">
        <div className="dashboard-link">
            <h3> Your details</h3>
            <p>About: {sDescription}</p>
            <div className="upload-img-container mb-5">
                <img src={sLogoUrl}  className="form-image"/>
            </div>
            <p>Phone number: {sPhone}</p>
            <p>Email address: {sEmail}</p>
            <p>Mon - Fri: {sOpeningHour} to {sClosingHour}</p>
            <p>Address: {sAddress}, {sCity}</p>
             <Link to="/update-profile" className="">Edit your profile</Link>

                    </div>

                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Dashboard;
