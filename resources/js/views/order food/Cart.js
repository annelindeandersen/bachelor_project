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
    const deleted = useSelector(state => state.ordersReducer.deleted);
    const dispatch = useDispatch();

    const history = useHistory();

    console.log({ 'restaurant': currentRestaurant, 'user': user, 'cart': cart });

    useEffect(() => {
        axios.get('/api/getcart', { params: { user: user && user.id } })
            .then(response => {
                console.log(response.data);
                setCart(response.data);
                setCurrentRestaurant(response.data.items.map(item => item.menu_item.restaurant_id)[0]);
                dispatch({ type: "DELETE_ONE", deleted: false })
            })
            .catch(error => {
                console.log(error);
            })
    }, [user, deleted])

    const order = () => {
        console.log('pressed order');
        dispatch({ type: "RESTAURANT", id: currentRestaurant })
        dispatch({ type: "GET_CART", cart: cart })
        history.push('/payment');
    }

    const deleteOne = ({ item }) => {
        console.log(item.menu_item.id);
        axios.post('/api/deleteone', { user: user.id, menu_item: item.menu_item.id })
            .then(response => {
                console.log(response);
                dispatch({ type: "DELETE_ONE", deleted: true })
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="container page">
            <div className="cart-page"></div>
            <h1 className="cart-header">Your cart</h1>
            <div className="cart">
                <div className="cart-items">
                    {!cart ? '' :
                        cart.items.length === 0 ? 'Nothing added to cart yet' : cart.items.map((item, index) => (
                            <div className="cart_item" key={index}>
                                <div>
                                    <strong>{item.menu_item.title} - <i>{item.menu_item.description}</i></strong><br />
                                    <small>Price: {item.menu_item.price} DKK</small>
                                </div>
                                <button onClick={() => deleteOne({ item })} className="orange-button">Delete</button>
                            </div>
                        ))}
                </div>
                {!cart ? '' :
                    cart.items.length === 0 ? '' :
                        <div className="total">
                            <h3>Ready to order?</h3>
                            <h4>{!cart ? '' : cart.total === 0 ? '' : 'Items: ' + cart.items.length} </h4>
                            <h4>{!cart ? '' : cart.total === 0 ? '' : 'Total: ' + cart.total + ' DKK'} </h4>
                            <br />
                            {!cart ? '' : cart.items.length === 0 ? '' :
                                <button className="blue-button" onClick={order}>Go to payment</button>
                            }
                        </div>
                }
            </div>
        </div >
    )
}

export default Cart;

if (document.getElementById('cart')) {
    ReactDOM.render(<Cart />, document.getElementById('cart'));
}