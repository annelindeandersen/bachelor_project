import React, { useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

const Cart = () => {
    const [cart, setCart] = useState('');
    const [currentUser, setCurrentUser] = useState('');
    const [currentRestaurant, setCurrentRestaurant] = useState();

    // logged in user
    const user = useSelector(state => state.usersReducer.user);
    const dispatch = useDispatch();

    const history = useHistory();

    console.log({ 'restaurant': currentRestaurant, 'user': user });

    useEffect(() => {
        axios.get('/api/getcart', { params: { user: user && user.id } })
            .then(response => {
                console.log(response.data);
                setCart(response.data);
                setCurrentRestaurant(response.data.items.map(item => item.menu_item.restaurant_id)[0]);
            })
            .catch(error => {
                console.log(error);
            })
    }, [user])

    const order = () => {
        console.log('pressed order');
        dispatch({ type: "RESTAURANT", id: currentRestaurant })
        history.push('/payment');
    }

    return (
        <div className="container">
            <h1>Cart</h1>
            {!cart ? '' : cart.items.map((item, index) => (
                <div key={index}>
                    <strong>{item.menu_item.title}</strong>
                    <p>{item.menu_item.description}</p>
                    <p>{item.menu_item.price} DKK</p>
                    <button className="green-button">Delete</button>
                </div>
            ))}
            <br />
            <h3>Total: {cart.total} DKK</h3>
            <br />
            <button className="green-button" onClick={order}>Order</button>
        </div >
    )
}

export default Cart;

if (document.getElementById('cart')) {
    ReactDOM.render(<Cart />, document.getElementById('cart'));
}