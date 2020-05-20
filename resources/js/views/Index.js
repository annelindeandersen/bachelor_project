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
import Dashboard from './restaurant/Dashboard';
import PasswordResetRequest from './restaurant/PasswordResetRequestForm';
import PasswordReset from './restaurant/PasswordReset';

// Components
import Menu from './../components/Menu';
import RestaurantMenu from './../components/RestaurantMenu';
import Footer from './../components/Footer';

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
    useEffect(() => {
      const getRestaurantData = async () => {
          try {
              const response = await fetch(`/api/getRestaurant/${localStorageData}`);
              const data = await response.json()
            //   console.log({'index':data.restaurant.id})
              dispatch({ type: 'CURRENT_USER', restaurant: data.restaurant});
              dispatch({ type: 'LOGGED_OUT', logged_out: false });
          } catch (error) {
              console.log(error)
          }
      }
      getRestaurantData();
  }, []);

    return (
        <Router>

            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/login">
                    <Menu />
                    <Login />
                </Route>
                <Route path="/register">
                    <Menu />
                    <Register />
                </Route>
                <Route path="/profile">
                    <Menu />
                    <Profile />
                </Route>
                <Route path="/orderfood">
                    <Menu />
                    <RestaurantOverview />
                </Route>
                <Route path="/restaurant">
                    <Menu />
                    <RestaurantSingleView />
                </Route>
                <Route path="/cart">
                    <Menu />
                    <Cart />
                </Route>
                <Route path="/payment">
                    <Menu />
                    <Payment />
                </Route>
                <Route path="/receipt">
                    <Menu />
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
                    <RestaurantMenu />
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


            </Switch>
            <Footer />
        </Router>
    );
}

export default Index;

if (document.getElementById('index')) {
    ReactDOM.render(<Provider store={store}><Index /></Provider>, document.getElementById('index'));
}
