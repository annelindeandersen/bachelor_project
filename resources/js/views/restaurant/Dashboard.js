import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'react-moment';
import moment from 'moment';


const Dashboard = () => {

    // Redux states
    let history = useHistory();
    const dispatch = useDispatch();
    const restaurant = useSelector(state => state.restaurantsReducer.restaurant); 
    const order_incoming = useSelector(state => state.ordersReducer.order_incoming_status);
    const order_accepted = useSelector(state => state.ordersReducer.order_accepted_status);
    const order_rejected = useSelector(state => state.ordersReducer.rejected_status);
    const [aReceivedOrders, setReceivedOrders] = useState();

    const localStorageData = localStorage.getItem('email');
    let date = new Date();  
   
    const [iID, setID] = useState('');
    const [sName, setName] = useState('');
    const [sEmail, setEmail] = useState('');
    const [sPhone, setPhone] = useState('');
    const [sAddress, setAddress] = useState('');
    const [sCity, setCity] = useState('');
    const [sPostcode, setPostcode] = useState('');
    const [sDescription, setDescription] = useState('');
    const [sBannerUrl, setBannerUrl]= useState('');
    const [sLogoUrl, setLogoUrl] = useState('');
    const [sOpeningHour, setOpeningHour] = useState('');
    const [sClosingHour, setClosingHour] = useState('');
    const [iRevenue, setIRevenue] = useState('');

    const [greeting, setGreeting] = useState('')

    let hour = parseInt(date.getHours());


    useEffect(() => {
        if(hour >= 6 && hour <= 12) {
            setGreeting('Good morning')
        }
        else if(hour >= 13 && hour <= 17){
            setGreeting('Good afternoon')
        }
        else {
            setGreeting('Good night')
        }
    }, [hour])

      //GET RESTAURANT FROM DB
      useEffect(() => {
        axios.get('/api/getRestaurant', { params: { id: localStorageData } })
            .then(response => {
                setID(response.data.restaurant.id);
                setName(response.data.restaurant.name);
                setPhone(response.data.restaurant.phone);
                setEmail(response.data.restaurant.email);
                setAddress(response.data.restaurant.address);
                setCity(response.data.restaurant.city);
                setPostcode(response.data.restaurant.postcode);
                setDescription(response.data.restaurant.profile.description);
                setOpeningHour(response.data.restaurant.profile.opening_hour);
                setClosingHour(response.data.restaurant.profile.closing_hour);
                setLogoUrl(response.data.restaurant.profile.logo);
                setBannerUrl(response.data.restaurant.image);
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
            axios.get('/api/getNewOrders', { params: { id: restaurant.id && restaurant.id } })
                .then(response => {
                    console.log(response)
                    setReceivedOrders(response.data);
                })
                .catch(error => {
                    console.log(error)
                })
        }, [restaurant, order_incoming, order_accepted, order_rejected]);


        //get monthly revenue
        useEffect(() => {
            axios.post(`/api/getMonthlyRevenue`, {
                id: restaurant.id && restaurant.id
              })
            .then(response => {
                console.log(response)
                setIRevenue(response.data.monthly_total)
            })
            .catch(error => {
                console.log(error)
            })
            }, [restaurant]);

            let m = moment(date, 'YYYY-MM-DD')
            console.log(m)


    return (

        <div className="green-bg dashboard-page">
                <Link to="/" >
                    <img id="logo" src="./img/delivr-3.png" alt="logo" className="dashboard-logo"/>
                </Link>
            <div className="container dashboard-container">
            <div className="row d-flex align-items-end flex-column">
            <Link to="/" onClick={(e) => logout(e)} className="grey-btn mb-3 logout-link">Logout</Link>
                </div>
                <div className="row">
                    <div className="col dash-col">
                            <div className="d-flex justify-content-between">
                            <h1 className="">{greeting}</h1>
                            <div className="d-flex flex-column">
                 

                               <p className="mb-0"> <Moment format='dddd'>{date}</Moment>, <Moment format= 'MMMM Do'>{date}</Moment></p>
                                <h4><Moment format= 'LT'>{date}</Moment></h4>
                                </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-7 dash-col">              
                        <div className="dashboard-link">
                            <h3>Incoming Orders</h3>
                                <ul className="list-group list-group-flush orders-list overflow-auto">
                                        {aReceivedOrders && aReceivedOrders.length ?
                                                <div className="alert alert-secondary" role="alert">
                                                <div className="notification-circle">{aReceivedOrders.length}</div>You have incoming orders. 
                                                <Link to="/restaurant-orders"> Manage your orders</Link>
                                                </div> : <p>You have no new orders. <Link to="/restaurant-orders">View active orders</Link></p> }
                                            {aReceivedOrders && aReceivedOrders.slice(0, 3).map((order, i) => (
                                        
                                        <li key={i} className="list-group-item  pb-5">
                                            <div className="d-flex justify-content-between border-bottom mb-2">
                                              <p>{order.user.first_name} {order.user.last_name}</p>
                                            <p>{
                                                  moment(order.created_at, 'YYYY-MM-DD').fromNow()}</p>
                                              </div>
                                            <h4>Delivery date/time:</h4>
                                            <p><Moment format= 'MMMM Do YYYY'>{order.delivery_time}</Moment>, <Moment format= 'LT'>{order.delivery_time}</Moment></p>
                                            <h4>Total price:</h4>
                                            <p>{order.total_amount},-</p>
                                          
                                        </li>
                                    ))}
                                        </ul>  
                                   

                        </div>
                    </div>
                    <div className="col-5 dash-col">
                        <div className="dashboard-link">
                        <div className="d-flex">
                            <div className="dashboard-profile-logo-container">
                             <img src={sLogoUrl}  className="form-image" alt=""/>
                        </div>
                        <div>
                            <h3>{sName}</h3>
                            <p>{sDescription ? sDescription :  <Link to="/update-profile"><img src="/img/pen.svg" className="edit-icon" alt=""/></Link> }</p>
                            </div>
                        </div>
                            <div className="d-flex">
                                <div>
                                <p><img src="/img/tel.svg" className="profile-icon" alt=""/> {sPhone}</p>
                                <p><img src="/img/mail.svg" className="profile-icon" alt=""/>{sEmail}</p>
                                <p><img src="/img/pin.svg" className="profile-icon" alt=""/> {sAddress}, {sCity}, {sPostcode}</p>
                                <p>Mon - Fri: {sOpeningHour && sClosingHour ? `${sOpeningHour} to ${sClosingHour}`: <Link to="/update-profile"><img src="/img/pen.svg" className="edit-icon" alt=""/></Link>}</p>
                            </div>
                        </div>
                            <Link to="/update-profile" className="">Edit your profile</Link>
                    </div>
                    <div className="dashboard-link mt-3">
                        <Link to="/restaurant-menu"  style={{ textDecoration: 'none' }}><h3>View and Update your Menu</h3></Link>
                        </div>
                        <div className="dashboard-link mt-3">
                        <h3><Moment format= 'MMMM'>{date}</Moment> Revenue</h3>
                        <p className="revenue">{iRevenue},-</p>
                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Dashboard;
