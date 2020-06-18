import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Receipt = () => {
    const [sUser, setUser] = useState('');
    const [order, setOrder] = useState('');

    const user = useSelector(state => state.usersReducer.user);
    const logout = useSelector(state => state.usersReducer.logout);
    const currentOrder = useSelector(state => state.ordersReducer.order);
    const history = useHistory();

    useEffect(() => {
        if (logout === 'click') {
            console.log('Logout is clicked')
            history.push('/login');
        }
    }, [logout])

    useEffect(() => {
        // set order
        console.log(currentOrder);
        setOrder(currentOrder && currentOrder);
        // get user's name
        console.log(user);
        setUser(!user ? '' : user.first_name);
    }, [user, currentOrder])

    return (
        <div className="page container receipt-page-wrapper">
            <div className="receipt-page"></div>
            <br />
            <h2>Awesome, {sUser}! Your order has been placed!</h2>
            <h3 style={{ 'textAlign': 'center' }}>Your receipt:</h3>
            {!order ? '' :
                <div className="receipt-wrapper">
                    <div className="order">
                        <div className="order-head">
                            <b>Order ID: {order.id}</b>
                            <b>{order.restaurant.name}</b>
                            <b>{order.delivery_time}</b>
                            <b>{order.total_amount} DKK</b>
                        </div>
                    </div>
                    <div>
                        <div className="detail-head">
                            <h4>Order items:</h4>
                        </div>
                        {order.order_item.map((item, index) => (
                            <div className="detail-info" key={index}>
                                <p>{item.menu_item.title}</p>
                                <p>{item.menu_item.price} DKK</p>
                            </div>
                        ))}
                        <div className="accepted">
                            <i>{order.accepted === 0 ? `Your order has been sent to ${order.restaurant.name}.` : `Your order has been accepted by ${order.restaurant.name}.`}</i><br />
                            <div className="status"><b>Status: </b><p>{order.status === 0 ? 'Order pending' : 'Order has been sent.'}</p></div>
                        </div>
                    </div>
                </div>
            }
        </div >
    )
}

export default Receipt;

if (document.getElementById('receipt')) {
    ReactDOM.render(<Receipt />, document.getElementById('receipt'));
}