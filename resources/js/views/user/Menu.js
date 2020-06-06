import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

const Menu = () => {
    let location = useLocation();
    let history = useHistory();
    const dispatch = useDispatch();

    //redux
    const logout = useSelector(state => state.usersReducer.logout);
    const user = useSelector(state => state.usersReducer.user);
    const addedToCart = useSelector(state => state.usersReducer.item_added);
    const deleted = useSelector(state => state.ordersReducer.deleted);
    const [cart, setCart] = useState('');

    const [color, setColor] = useState('');

    const logmeout = () => {
        const authOptions = {
            method: 'GET',
            url: '/api/auth/logout',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        axios(authOptions)
            .then(response => {
                console.log(response);
                localStorage.removeItem('token');
                dispatch({ type: 'LOGOUT_USER', logout: 'click' });
            }).catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        axios.get('/api/getcart', { params: { user: user && user.id } })
            .then(response => {
                console.log({ "CART_MENU": response.data });
                setCart(response.data);
                dispatch({ type: "DELETE_ONE", deleted: false })
            })
            .catch(error => {
                console.log(error);
            })
    }, [user, addedToCart, deleted])

    // useEffect(() => {
    //     if (location.pathname = '/restaurant') {
    //         setColor('white');
    //     } else {
    //         setColor('grey');
    //     }
    // }, [location.pathname])

    return (
        <>
        {
            location.pathname === '/payment' ||
              location.pathname === '/' ||
                location.pathname === '/restaurant-dashboard' ||
                location.pathname === '/for-restaurants' ||
                location.pathname === '/restaurant-register' ||
                location.pathname === '/restaurant-login' ||
                location.pathname === '/restaurant-password-request' ||
                location.pathname === '/restaurant-password-reset' ||
                location.pathname === '/update-profile' ||
                location.pathname === '/restaurant-profile' ||
                location.pathname === '/restaurant-orders' ||
                location.pathname === '/restaurant-menu' ? '' :
                <nav className="container">
                    <div>
                        <Link to="/">
                            <img className={classNames({ 'white-logo': location.pathname === '/restaurant' })} id="logo" src="./img/delivr-3.png" alt="logo" />
                        </Link>
                    </div>
                    <div className="menu-items">
                        {logout === false ? '' :
                            <div>
                                <Link className={classNames({ 'white-font': location.pathname === '/restaurant' })} style={{ 'textDecoration': 'none' }} to="/login">Login</Link>
                            </div>
                        }
                        {logout === false ? '' :
                            <div>
                                <Link className={classNames({ 'white-font': location.pathname === '/restaurant' })} style={{ 'textDecoration': 'none' }} to="/register">Register</Link>
                            </div>
                        }
                        {logout === true ? '' :
                            <div>
                                <Link className={classNames({ 'white-font': location.pathname === '/restaurant' })} style={{ 'textDecoration': 'none' }} to="/orderfood">Food</Link>
                            </div>
                        }
                        {logout === true ? '' :
                            <div>
                                <Link className={classNames({ 'white-font': location.pathname === '/restaurant' })} style={{ 'textDecoration': 'none' }} to="/profile">Profile</Link>
                            </div>
                        }
                        {logout === true ? '' :
                            <div id="cartMenu">
                                <div id="cartItemsLength">{cart && cart.items.length}</div>
                                <Link className={classNames({ 'white-font': location.pathname === '/restaurant' })} style={{ 'textDecoration': 'none' }} to="/cart">Cart</Link>
                            </div>
                        }
                        {logout === true ? '' :
                            <div>
                                <div className={classNames({ 'white-font': location.pathname === '/restaurant' })} onClick={logmeout}>Logout</div>
                            </div>
                        }
                    </div>
                </nav>
        }
    </>
    )
}

export default Menu;

if (document.getElementById('menu')) {
    ReactDOM.render(<Menu />, document.getElementById('menu'));
}