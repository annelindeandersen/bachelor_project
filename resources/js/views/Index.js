import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { composeWithDevTools } from 'redux-devtools-extension';
import styling from './../app.css';

// Views for users
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import RestaurantOverview from './order food/RestaurantOverview';
import RestaurantSingleView from './order food/RestaurantSingleView';
import Cart from './order food/Cart';
import Payment from './order food/Payment';
import Receipt from './order food/Receipt';

// Views for restaurants
import ForRestaurants from './restaurant/ForRestaurants';
import RestaurantRegister from './restaurant/Register';
import RestaurantLogin from './restaurant/RestaurantLogin';
import RestaurantMenu from './restaurant/RestaurantMenu';
import Dashboard from './restaurant/Dashboard';
import CreateProfile from './restaurant/CreateProfile';
import Orders from './restaurant/Orders';

// Components
import Menu from './../components/Menu';
import Footer from './../components/Footer';

// Connect redux
import { createStore, combineReducers } from 'redux';
import { Provider, useDispatch } from 'react-redux';

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
                console.log(response.data);
                dispatch({ type: 'LOGOUT_USER', logout: false });
                dispatch({ type: 'CURRENT_USER', user: response.data });
                dispatch({ type: 'USER_TOKEN', token: localStorage.getItem('token') });
            }).catch((err) => {
                console.log(err);
            })
    }, [])

    // get restaurant information if logged in
    // useEffect(() => {
    //     const getRestaurant = async () => {
    //         try {
    //             const response = await fetch(`/api/getRestaurant?id=${localStorageData}`);
    //             const data = await response.json();
    //             console.log(response);
    //             console.log(data);
    //             dispatch({ type: 'CURRENT_USER', payload: data });
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     getRestaurant();
    // }, []);

    return (
        <Router>
            <Menu />
            <Switch>
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
                    <ForRestaurants />
                </Route>
                <Route exact path="/restaurant-register">
                    <RestaurantRegister />
                </Route>
                <Route exact path="/restaurant-login">
                    <RestaurantLogin />
                </Route>
                <Route exact path="/restaurant-dashboard">
                    <Dashboard />
                </Route>
                <Route exact path="/restaurant-profile">
                    <CreateProfile />
                </Route>
                <Route exact path="/restaurant-menu">
                    <RestaurantMenu />
                </Route>
                <Route exact path="/restaurant-orders">
                    <Orders />
                </Route>
            </Switch>
            <Footer />
        </Router>
    );
}

export default Index;

if (document.getElementById('index')) {
    ReactDOM.render(<Provider store={store}><Index /></Provider>, document.getElementById('index'));
}
