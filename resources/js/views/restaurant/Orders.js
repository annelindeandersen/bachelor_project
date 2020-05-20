import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import RestaurantOrder from '../../components/RestaurantOrder';
import './../../restaurant.css';

const Orders = () => {
    //redux
    const order_accepted = useSelector(state => state.ordersReducer.order_accepted_status);
    const order_in_progress = useSelector(state => state.ordersReducer.in_progress_status);
    const order_ready = useSelector(state => state.ordersReducer.ready_for_dispatch_status);
    const restaurant = useSelector(state => state.restaurantsReducer.restaurant);
    const dispatch = useDispatch();

    const [aAcceptedOrders, setAcceptedOrders] = useState();
    const [aReceivedOrders, setReceivedOrders] = useState();
    const [aOrdersInProgress, setOrdersInProgress] = useState();
    const [aOrdersForDispatch,  setOrdersForDispatch] = useState();

    //get new orders
    useEffect(() => {
        console.log(!restaurant ?  '': restaurant)
        if(restaurant){
            axios.get(`/api/getNewOrders/${restaurant.id}`)
            .then(response => {
                setReceivedOrders(response.data);
            })
            .catch(error => {
                console.log(error)
            })
        }   
    }, [restaurant, order_accepted, order_in_progress, order_ready]);


//get accepted orders
    useEffect(() => {
        console.log(!restaurant ?  '': restaurant)
        if(restaurant){
            axios.get(`/api/getAcceptedOrders/${restaurant.id}`)
            .then(response => {
                setAcceptedOrders(response.data);
            })
            .catch(error => {
                console.log(error)
            })
        }   
    }, [restaurant, order_accepted, order_in_progress, order_ready]);


    //get orders in progress
    useEffect(() => {
        console.log(!restaurant ?  '': restaurant)
        if(restaurant){
            axios.get(`/api/ordersInProgress/${restaurant.id}`)
            .then(response => {
                setOrdersInProgress(response.data);
            })
            .catch(error => {
                console.log(error)
            })
        }   
    }, [restaurant, order_accepted, order_in_progress, order_ready])

    //get orders dispatched
    useEffect(() => {
        console.log(!restaurant ?  '': restaurant)
        if(restaurant){
            axios.get(`/api/ordersforDispatch/${restaurant.id}`)
            .then(response => {
                setOrdersForDispatch(response.data);
            })
            .catch(error => {
                console.log(error)
            })
        }   
    }, [restaurant, order_accepted, order_in_progress, order_ready])


//accept order
    const accept = async (id) => {
        try{ 
            // console.log(id);
            event.preventDefault();
            const response = await fetch(`/api/acceptOrder/${id}`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            // console.log(data)
            dispatch({ type: 'ORDER_ACCEPTED', order_accepted: true});
            dispatch({ type: 'ORDER_ACCEPTED', order_accepted: false    });
        } catch(error){
            console.log(error)
        }   
    }

    //reject order
    const reject = async (id) => {
        // console.log(id);
        event.preventDefault();
        const response = await fetch(`/api/rejectOrder/${id}`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        dispatch({ type: 'ORDER_ACCEPTED', order_accepted: false});
        dispatch({ type: 'ORDER_ACCEPTED', order_accepted: ''});
    }

//set order in progress
    const setInProgress = async (id) => {
        console.log(id);
        event.preventDefault();
        const response = await fetch(`/api/orderInProgress/${id}`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log(data)
        dispatch({ type: 'IN_PROGRESS', order_ready : true});
        dispatch({ type: 'IN_PROGRESS', order_ready: false});
    }

    //set ready for dispatch
    const  setReadyForDispatch = async (id) => {
        console.log(id);
        event.preventDefault();
        const response = await fetch(`/api/ordersforDispatch/${id}`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log(data)
        dispatch({ type: 'READY_FOR_DISPATCH', order_ready: true});
        dispatch({ type: 'READY_FOR_DISPATCH', order_ready: false});
    }

    return (
        <div className="container">
            <h1>Orders</h1>
            <div className="order_container">
  

         <div className="section">
            <h2>New orders</h2>
            {aReceivedOrders && aReceivedOrders.map((order, i) => (
                    <div key={i}>
                        <h1>{order.id}</h1>
                        <button name="accept" type="submit" value={order.id} onClick={(event) => accept(event.target.value)}>Accept</button>
                        <button name="reject" type="submit" value={order.id} onClick={(event) => reject(event.target.value)}>Reject</button>                        
                        <h5>{order.delivery_time}</h5>
                        <h5>Total price: {order.total_amount},-</h5> 
                         <p>{order.user.first_name} {order.user.last_name}</p> 
                        {order.order_item ? order.order_item.map((item, i) => (
                            <div key={i}>
                                <p>{item.menu_item.id}. {item.menu_item.title}</p>                              
                            </div>
                            
                        )) : ''} 
                          <hr></hr>
                    </div>
                     
                ))}
             
         </div>
         <div className="section">
            <h2>Accepted</h2>
            {aAcceptedOrders && aAcceptedOrders.map((order, i) => (
                    <div key={i}>
                        <h1>{order.id}</h1>                    
                        <button name="status" type="submit" value={order.id} onClick={(event) => setInProgress(event.target.value)}>
                         Mark as in Progress
                            </button>                     
                        <h5>{order.delivery_time}</h5>
                        <h5>Total price: {order.total_amount},-</h5> 
                         <p>{order.user.first_name} {order.user.last_name}</p> 
                        {order.order_item ? order.order_item.map((item, i) => (
                            <div key={i}>
                                <p>{item.menu_item.title}</p>                               
                            </div>
                            
                        )) : ''} 
                          <hr></hr>
                    </div>
                     
                ))}
         </div>
         <div className="section">
            <h2>In Progress</h2>
            {aOrdersInProgress && aOrdersInProgress.map((order, i) => (
                    <div key={i}>
                         <h1>{order.id}</h1>
                        <button name="status" type="submit" value={order.id} 
                        onClick={(event) => setReadyForDispatch(event.target.value)}>Mark as Ready for Dispatch</button>                       
                        <h5>{order.delivery_time}</h5>
                        <h5>Total price: {order.total_amount},-</h5> 
                         <p>{order.user.first_name} {order.user.last_name}</p> 
                        {order.order_item ? order.order_item.map((item, i) => (
                            <div key={i}>
                                <p>{item.menu_item.title}</p>   
                                <p></p>   
                            </div>
                            
                        )) : ''} 
                          <hr></hr>
                    </div>
                     
                ))}
             
         </div>
         <div className="section">
            <h2>Ready for pick up</h2>
            {aOrdersForDispatch && aOrdersForDispatch.map((order, i) => (
                    <div key={i}>
                         <h1>{order.id}</h1>
                        <button name="status" type="submit" value={order.id} onClick={(event) => setForDispatch(event.target.value)}>  
                      Mark as Completed
                        </button>                  
                        <h5>{order.delivery_time}</h5>
                        <h5>Total price: {order.total_amount},-</h5> 
                         <p>{order.user.first_name} {order.user.last_name}</p> 
                        {order.order_item ? order.order_item.map((item, i) => (
                            <div key={i}>
                                <p>{item.menu_item.title}</p>   
                            </div>
                            
                        )) : ''} 
                          <hr></hr>
                    </div>
                     
                ))}
             
         </div>
      
         </div>
        </div>
    );
}
export default Orders;
if (document.getElementById('orders')) {
    ReactDOM.render(<Orders />, document.getElementById('orders'));
}
