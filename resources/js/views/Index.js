import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { composeWithDevTools } from 'redux-devtools-extension';
import styling from './../app.css';

// Views
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import RestaurantOverview from './order food/RestaurantOverview';
import RestaurantSingleView from './order food/RestaurantSingleView';
import Cart from './order food/Cart';
import Payment from './order food/Payment';

// Components
import Menu from './../components/Menu';
import Footer from './../components/Footer';

// Connect redux
import { createStore, combineReducers } from 'redux';
import { Provider, useDispatch } from 'react-redux';

// Reducers
import users from './../reducers/users';
import orders from './../reducers/orders';

// Reducers combined
const rootReducer = combineReducers({
    usersReducer: users,
    ordersReducer: orders
})

// Create store
const store = createStore(rootReducer, composeWithDevTools());

function Index() {
    const dispatch = useDispatch();

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
            </Switch>
            <Footer />
        </Router>
    );
}

export default Index;

if (document.getElementById('index')) {
    ReactDOM.render(<Provider store={store}><Index /></Provider>, document.getElementById('index'));
}
