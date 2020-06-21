import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Axios from 'axios';
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
    const [aOrdersForDispatch, setOrdersForDispatch] = useState();
    let history = useHistory();

    // useEffect(() => {
    //     const checkAuth = () => {
    //         if (localStorage.getItem("email") === null) {
    //              history.push('/');
    //           }
    //     }
    //     checkAuth()
    // }, [])

    console.log({ 'RESTAURANT_FROM_ORDER': restaurant })
    //get new orders
    useEffect(() => {
        console.log(!restaurant ? '' : restaurant)
        // if (restaurant) {
        axios.get('/api/getNewOrders', { params: { id: restaurant && restaurant.id } })
            .then(response => {
                setReceivedOrders(response.data);
            })
            .catch(error => {
                console.log(error)
            })
        // }
    }, [restaurant, order_accepted, order_in_progress, order_ready]);

    //get accepted orders
    useEffect(() => {
        console.log(!restaurant ? '' : restaurant)
        // if (restaurant) {
        axios.get('/api/getAcceptedOrders/', { params: { id: restaurant && restaurant.id } })
            .then(response => {
                console.log(response.data);
                setAcceptedOrders(response.data);
            })
            .catch(error => {
                console.log(error)
            })
        // }
    }, [restaurant, order_accepted, order_in_progress, order_ready]);

    //get orders in progress
    useEffect(() => {
        console.log(!restaurant ? '' : restaurant)
        // if (restaurant) {
        axios.get('/api/ordersInProgress/', { params: { id: restaurant && restaurant.id } })
            .then(response => {
                setOrdersInProgress(response.data);
            })
            .catch(error => {
                console.log(error)
            })
        // }
    }, [restaurant, order_accepted, order_in_progress, order_ready])

    //get orders dispatched
    useEffect(() => {
        console.log(!restaurant ? '' : restaurant)
        // if (restaurant) {
        axios.get('/api/ordersforDispatch', { params: { id: restaurant && restaurant.id } })
            .then(response => {
                console.log(response)
                setOrdersForDispatch(response.data);
            })
            .catch(error => {
                console.log(error)
            })
        // }
    }, [restaurant, order_accepted, order_in_progress, order_ready])

    //accept order
    const accept = async (id) => {

        axios.post('/api/acceptOrder', { id: id })
            .then(response => {
                console.log(response);
                dispatch({ type: 'ORDER_ACCEPTED', order_accepted: true });
                dispatch({ type: 'ORDER_ACCEPTED', order_accepted: false });
            })
            .catch(error => {
                console.log(error);
            })

    }

    //reject order

    const confirmReject = (id) => {
        swal({
            title: "Are you sure you want to cancel this order?",
            text: "Once you have cancelled it you will not be able to undo this action",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.post('/api/rejectOrder', { id: id })
                        .then(response => {
                            console.log(response);
                            dispatch({ type: 'ORDER_ACCEPTED', order_accepted: false });
                            dispatch({ type: 'ORDER_ACCEPTED', order_accepted: '' });
                        })
                        .catch(error => {
                            console.log(error);
                        })

                    swal("Order has been rejected, a message has been sent to the customer", {
                        icon: "success",
                    });
                } else {
                    swal({
                        text: "Order saved",
                        icon: "success",
                        timer: 1000,
                        button: false
                    })
                }
            });
    }

    //set order in progress
    const setInProgress = (id) => {
        console.log(id);

        axios.post('/api/orderInProgress', { id: id })
            .then(response => {
                console.log(response);
                dispatch({ type: 'IN_PROGRESS', order_ready: true });
                dispatch({ type: 'IN_PROGRESS', order_ready: false });
            })
            .catch(error => {
                console.log(error);
            })
    }

    //set ready for dispatch
    const setReadyForDispatch = async (id) => {
        console.log(id);

        axios.post('/api/ordersforDispatch/', { id: id })
            .then(response => {
                console.log(response)
                dispatch({ type: 'READY_FOR_DISPATCH', order_ready: true });
                dispatch({ type: 'READY_FOR_DISPATCH', order_ready: false });
            })
            .catch(error => {
                console.log(error)
            });
    }

    return (
        <div className="container">
            <div className="order_container">

                <div>
                    <h1 className="orange-text text-center">Orders</h1>
                    <div className="order-lists">
                        <div className="section">
                            <div className="card order_card m-1">
                                <div className="card-header">
                                    <div className="icon-container mt-3">
                                        <img src="./img/ordering.svg" className="card-img-top" alt="icon" />
                                    </div>
                                    <h3 className="text-center mt-3">New orders</h3>
                                </div>

                                <ul className="list-group list-group-flush orders-list overflow-auto">
                                    {aReceivedOrders && aReceivedOrders.map((order, i) => (
                                        <li key={i} className="list-group-item  pb-5">
                                            <h5>Delivery date: {order.delivery_time}</h5>
                                            <h5>Total price: {order.total_amount},-</h5>
                                            <p>Customer name: {order.user.first_name} {order.user.last_name}</p>
                                            <h3>Items</h3>
                                            {order.order_item ? order.order_item.map((item, i) => (
                                                <div key={i}>
                                                    <p>{item.menu_item.title}</p>
                                                </div>

                                            )) : ''}
                                            <button name="accept" type="submit" className="btn btn-secondary mr-3" value={order.id} onClick={(event) => accept(event.target.value)}>Accept</button>
                                            <button name="reject" type="submit" className=" btn btn-danger" value={order.id} onClick={(event) => confirmReject(event.target.value)}>Reject</button>
                                        </li>
                                    ))}
                                </ul>

                            </div>
                        </div>
                        <div className="section order_card">
                            <div className="card order_card m-1">
                                <div className="card-header">
                                    <div className="icon-container mt-3">
                                        <img src="./img/check.svg" className="card-img-top" alt="icon" />
                                    </div>
                                    <h3 className="text-center mt-3">Accepted orders</h3>
                                </div>

                                <ul className="list-group list-group-flush orders-list overflow-auto">
                                    {aAcceptedOrders && aAcceptedOrders.map((order, i) => (
                                        <li key={i} className="list-group-item  pb-5">
                                            {/* <p>Order ID: {order.id}</p> */}
                                            <h5>Delivery date: {order.delivery_time}</h5>
                                            <h5>Total price: {order.total_amount},-</h5>
                                            <p>Customer name: {order.user.first_name} {order.user.last_name}</p>
                                            <h3>Items</h3>
                                            {order.order_item ? order.order_item.map((item, i) => (
                                                <div key={i}>
                                                    <p>{item.menu_item.title}</p>
                                                </div>

                                            )) : ''}
                                            <button name="status" type="submit" className="btn btn-secondary" value={order.id} onClick={(event) => setInProgress(event.target.value)}>Accepted</button>

                                        </li>
                                    ))}
                                </ul>

                            </div>
                        </div>
                        <div className="section">
                            <div className="card order_card m-1">
                                <div className="card-header">
                                    <div className="icon-container mt-3">
                                        <img src="./img/cooking.svg" className="card-img-top" alt="icon" />
                                    </div>
                                    <h3 className="text-center mt-3">In progress</h3>
                                </div>

                                <ul className="list-group list-group-flush orders-list overflow-auto">
                                    {aOrdersInProgress && aOrdersInProgress.map((order, i) => (
                                        <li key={i} className="list-group-item  pb-5">
                                            {/* <p>Order ID: {order.id}</p> */}
                                            <h5>Delivery date: {order.delivery_time}</h5>
                                            <h5>Total price: {order.total_amount},-</h5>
                                            <p>Customer name: {order.user.first_name} {order.user.last_name}</p>
                                            <h3>Items</h3>
                                            {order.order_item ? order.order_item.map((item, i) => (
                                                <div key={i}>
                                                    <p>{item.menu_item.title}</p>
                                                </div>

                                            )) : ''}
                                            <button name="status" type="submit" className="grey-btn" value={order.id}
                                                onClick={(event) => setReadyForDispatch(event.target.value)}>Ready for Dispatch</button>

                                        </li>
                                    ))}
                                </ul>

                            </div>
                        </div>
                        <div className="section">
                            <div className="card order_card m-1">
                                <div className="card-header">
                                    <div className="icon-container mt-3">
                                        <img src="./img/deliver.svg" className="card-img-top" alt="icon" />
                                    </div>
                                    <h3 className="text-center mt-3">Ready for dispatch</h3>
                                </div>

                                <ul className="list-group list-group-flush orders-list overflow-auto">
                                    {aOrdersForDispatch && aOrdersForDispatch.map((order, i) => (
                                        <li key={i} className="list-group-item  pb-5">
                                            {/* <p>Order ID: {order.id}</p> */}
                                            <h5>Delivery date: {order.delivery_time}</h5>
                                            <h5>Total price: {order.total_amount},-</h5>
                                            <p>Customer name: {order.user.first_name} {order.user.last_name}</p>
                                            <h3>Items</h3>
                                            {order.order_item ? order.order_item.map((item, i) => (
                                                <div key={i}>
                                                    <p>{item.menu_item.title}</p>
                                                </div>

                                            )) : ''}
                                            {/* <button name="status" type="submit" value={order.id} 
                            onClick={(event) => setForDispatch(event.target.value)}>Mark as Completed</button> */}

                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Orders;
if (document.getElementById('orders')) {
    ReactDOM.render(<Orders />, document.getElementById('orders'));
}