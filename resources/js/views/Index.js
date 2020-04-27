import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Views
import Home from './../views/Home';
import ForRestaurants from './../views/ForRestaurants';
import Login from './../views/Login';
import Register from './../views/Register';
import Profile from './../views/Profile';

// Components
import Menu from './../components/Menu';
import Footer from './../components/Footer';



function Index() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/for-restaurants">
                    <Menu />
                    <ForRestaurants />
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
            </Switch>
            <Footer />
        </Router>
    );
}

export default Index;

if (document.getElementById('index')) {
    ReactDOM.render(<Index />, document.getElementById('index'));
}
