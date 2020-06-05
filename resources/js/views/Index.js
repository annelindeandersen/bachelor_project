import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { composeWithDevTools } from 'redux-devtools-extension';
import styling from './../app.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// Views for users
import Home from './Home';
import Login from './user/Login';
import Register from './user/Register';
import Profile from './user/Profile';
import RestaurantOverview from './order food/RestaurantOverview';
import RestaurantSingleView from './order food/RestaurantSingleView';
import Cart from './order food/Cart';
import Payment from './order food/Payment';
import Receipt from './order food/Receipt';

// Views for restaurants
import ForRestaurants from './restaurant/ForRestaurants';
import RestaurantRegister from './restaurant/Register';
import RestaurantLogin from './restaurant/RestaurantLogin';
import Dashboard from './restaurant/Dashboard';
import PasswordResetRequest from './restaurant/PasswordResetRequestForm';
import PasswordReset from './restaurant/PasswordReset';
import ProfileForm from './restaurant/ProfileForm';
import RestaurantProfile from './restaurant/RestaurantProfile';
import RestaurantMenuPage from './restaurant/RestaurantMenu';
import RestaurantOrders from './restaurant/Orders';

// Components
import Menu from './user/Menu';
import Footer from './../components/Footer';
import RestaurantMenu from './restaurant/components/RestaurantMenu';

// Connect redux
import { createStore, combineReducers } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';

// Reducers
import users from './../reducers/users';
import orders from './../reducers/orders';
import restaurants from './../reducers/restaurants';
import menus from './../reducers/menus';

// Reducers combined
const rootReducer = combineReducers({
    usersReducer: users,
    ordersReducer: orders,
    restaurantsReducer: restaurants,
    menuReducer: menus
})

// Create store
const store = createStore(rootReducer, composeWithDevTools());

function Index() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.usersReducer.user);
    const token = useSelector(state => state.usersReducer.token);
    const localStorageData = localStorage.getItem('email');

    // get user if logged in
    useEffect(() => {
        const authOptions = {
            method: 'GET',
            url: '/api/auth/user',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        axios(authOptions)
            .then(response => {
                console.log({ "INDEX_USER": response.data });
                // dispatch({ type: 'USER_TOKEN', token: localStorage.getItem('token') });
                dispatch({ type: 'LOGOUT_USER', logout: false });
                dispatch({ type: 'CURRENT_USER', user: response.data });
                // dispatch({ type: 'CART_ITEMS', cart: cart });
            }).catch((err) => {
                console.log(err);
            })
    }, [token])

    // get restaurant information if logged in
    useEffect(() => {
        axios.get('/api/getRestaurant/', { params: { id: localStorageData } })
            .then(response => {
                console.log({ 'FROM_INDEX': response });
                dispatch({ type: 'CURRENT_RESTAURANT', restaurant: response.data.restaurant });
                dispatch({ type: 'LOGGED_OUT', logged_out: false });
            })
            .catch(error => {
                console.log(error)
            })
    }, [])


    return (
        <div className="App">
            <Router>
                <Menu />
                <Route render={({ location }) => (
                    <TransitionGroup>
                        <CSSTransition key={location.key} timeout={300} classNames='fade'>
                            <Switch location={location}>
                                <Route exact path="/">
                                    <Home />
                                </Route>
                                <Route path="/login">
                                    <Login />
                                </Route>
                                <Route path="/register">
                                    <Register />
                                </Route>
                                <Route path="/profile">
                                    <Profile />
                                </Route>
                                <Route path="/orderfood">
                                    <RestaurantOverview />
                                </Route>
                                <Route path="/restaurant">
                                    <RestaurantSingleView />
                                </Route>
                                <Route path="/cart">
                                    <Cart />
                                </Route>
                                <Route path="/payment">
                                    <Payment />
                                </Route>
                                <Route path="/receipt">
                                    <Receipt />
                                </Route>
                                <Route exact path="/for-restaurants">
                                    <RestaurantMenu />
                                    <ForRestaurants />
                                </Route>
                                <Route exact path="/restaurant-register">
                                    <RestaurantMenu />
                                    <RestaurantRegister />
                                </Route>
                                <Route exact path="/restaurant-login">
                                    <RestaurantMenu />
                                    <RestaurantLogin />
                                </Route>
                                <Route exact path="/restaurant-dashboard">
                                    <Dashboard />
                                </Route>
                                <Route exact path="/restaurant-password-request">
                                    <RestaurantMenu />
                                    <PasswordResetRequest />
                                </Route>
                                <Route exact path="/restaurant-password-reset">
                                    <RestaurantMenu />
                                    <PasswordReset />
                                </Route>
                                <Route exact path="/update-profile">
                                    <RestaurantMenu />
                                    <ProfileForm />
                                </Route>
                                <Route exact path="/restaurant-profile">
                                    <RestaurantMenu />
                                    <RestaurantProfile />
                                </Route>
                                <Route exact path="/restaurant-orders">
                                    <RestaurantMenu />
                                    <RestaurantOrders />
                                </Route>
                                <Route exact path="/restaurant-menu">
                                    <RestaurantMenu />
                                    <RestaurantMenuPage />
                                </Route>
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                )} />
            </Router>
        </div>
    );
}

export default Index;

if (document.getElementById('index')) {
    ReactDOM.render(<Provider store={store}><Index /></Provider>, document.getElementById('index'));
}
