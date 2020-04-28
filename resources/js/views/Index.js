import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { composeWithDevTools } from 'redux-devtools-extension';

// Views
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import RestaurantOverview from './order food/RestaurantOverview';
import RestaurantSingleView from './order food/RestaurantSingleView';

// Components
import Menu from './../components/Menu';
import Footer from './../components/Footer';

// Connect redux
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

// Reducers
import users from './../reducers/users';

// Reducers combined
const rootReducer = combineReducers({
    usersReducer: users
})

// Create store
const store = createStore(rootReducer, composeWithDevTools());

function Index() {
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
                <Route path="/orderfood/?id">
                    <RestaurantSingleView />
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
