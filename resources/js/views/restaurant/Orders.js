import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const Orders = () => {
    //redux
    const logged_out = useSelector(state => state.restaurantsReducer.logged_out);
    const restaurant = useSelector(state => state.restaurantsReducer.restaurants);
    const dispatch = useDispatch();
    console.log(`${restaurant.id} is from redddddux`)
    const [aOrders, setOrders] = useState();
    const getOrders = async () => {
        const response = await fetch(`/api/getOrders/${restaurant.id}`);
        console.log('id is ' + restaurant.id)
        const data = await response.json();
        console.log(response);
        console.log(data);
        setOrders(data.order_details)
    };
    useEffect(() => {
        getOrders();
    }, [restaurant.id])

    console.log(aOrders);

    // useEffect(()=> {
    const accept = async (id) => {
        console.log(id);
        event.preventDefault();
        const response = await fetch(`/api/acceptOrder/${id}`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data)
    }
    // },[])

    const reject = async (id) => {
        console.log(id);
        event.preventDefault();
        const response = await fetch(`/api/rejectOrder/${id}`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log(data)
    }
    return (
        <div className="container">
            <h1>Orders</h1>
            {aOrders && aOrders.map((order) => (
                <div>
                    <h1>{order.id}</h1>
                    <button name="accept" type="submit" value={order.id} onClick={(event) => accept(event.target.value)}>Accept</button>
                    <button name="reject" type="submit" value={order.id} onClick={(event) => reject(event.target.value)}>Reject</button>
                    <h1>{order.delivery_time}</h1>
                    {order.order_items.map((item) => (
                        <div>
                            <p>{item.menu_item}</p>
                            <p>{item.menu_item.description}</p>
                            <p>{item.menu_item.price} kr.</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
export default Orders;
if (document.getElementById('orders')) {
    ReactDOM.render(<Orders />, document.getElementById('orders'));
}
