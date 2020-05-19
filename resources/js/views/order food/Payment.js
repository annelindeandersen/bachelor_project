import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from "react-datepicker";
import { setHours, setMinutes } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

const Payment = () => {
    // variables and states for date & time
    const today = new Date();
    const currentTime = today.getHours();
    const minutes = today.getMinutes();
    const [startDate, setStartDate] = useState(setHours(setMinutes(new Date(), minutes + 45), minutes > 15 ? currentTime + 1 : currentTime));
    const [openingHour, setOpeningHour] = useState('');
    const [closingHour, setClosingHour] = useState('');

    // input states
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [securityNumber, setSecurityNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [cardError, setCardError] = useState('');
    const [expirationError, setExpirationError] = useState('');
    const [securityError, setSecurityError] = useState('');
    const [nameError, setNameError] = useState('');

    const [asap, setAsap] = useState('');
    const [later, setLater] = useState('');

    // redux & history
    const restaurantId = useSelector(state => state.ordersReducer.restaurant);
    const order = useSelector(state => state.ordersReducer.order);
    const user = useSelector(state => state.usersReducer.user);
    const logout = useSelector(state => state.usersReducer.logout);
    const dispatch = useDispatch();
    const history = useHistory();

    console.log(startDate, restaurantId, openingHour, closingHour, currentTime);
    console.log({ today: today.toISOString().substring(0, 10) + ' ' + today.toISOString().substring(11, 16) });

    useEffect(() => {
        if (logout === 'click') {
            console.log('Logout is clicked')
            history.push('/login');
        }
    }, [logout])

    useEffect(() => {
        // if no id then redirect to cart to fetch id once again
        if (!restaurantId) {
            history.push('/cart');
        }
        axios.get('/api/getselected', { params: { id: !restaurantId ? '' : restaurantId } })
            .then(response => {
                console.log(response.data);
                // setRestaurant(response.data);
                setOpeningHour(response.data.profile.opening_hour);
                setClosingHour(response.data.profile.closing_hour);
            })
            .catch(err => {
                console.log(err);
            })
    }, [restaurantId])

    const orderNow = () => {
        console.log('clicked', user, restaurantId, startDate.toISOString().substring(0, 10) + ' ' + startDate.toISOString().substring(11, 16));

        if (cardNumber.length !== 16) {
            console.log('has to be 16')
            setCardError('1px solid red');
        }
        if (expirationDate.length !== 5) {
            console.log('has to be 5')
            setExpirationError('1px solid red');
        }
        if (securityNumber.length !== 3) {
            console.log('has to be 3')
            setSecurityError('1px solid red');
        }
        if (cardName.length < 4) {
            console.log('has to be more than 3')
            setNameError('1px solid red');
        }
        // if (currentTime > startDate.getHours || currentTime === startDate && currentTime) {
        //     console.log('has to be more than 3')
        //     setNameError('1px solid red');
        // }

        if (cardNumber.length === 16 && expirationDate.length === 5 && securityNumber.length === 3 && cardName.length > 3) {
            axios.post('/api/createorder', { id: user.id, restaurant: restaurantId, date: startDate.toISOString().substring(0, 10) + ' ' + startDate.toISOString().substring(11, 16) })
                .then(response => {
                    console.log(response);
                    dispatch({ type: 'GET_ORDER', order: response.data });
                })
                .catch(error => {
                    console.log(error);
                })

            axios.post('/api/deleteall', { user: user.id })
                .then(response => {
                    console.log(response);
                    history.push('/receipt');
                })
                .catch(error => {
                    console.log(error);
                })
        }

    }

    return (
        <div>
            <div className="payment-wrapper">
                <div className="datepicker">
                    <div className="flex"><h2>Review order from</h2><img className="payment-logo" src="./img/delivr-3.png" alt="logo" /></div>
                    <div className="payment-order">
                        {!order ? '' : order.items.map((item, index) => (
                            <div className="payment-order-item" key={index}>
                                <strong>{item.menu_item.title}</strong>
                                <p>{item.menu_item.price} DKK</p>
                            </div>
                        ))}
                    </div>
                    <h2>Delivery to</h2>
                    <input className="form-control payment-address" disabled={true} placeholder={user && user.address + ', ' + user.postcode + ' ' + user.city} />
                    <Link to="/profile"><i>Go to profile to change delivery address.</i></Link>
                    <h2>Pick time & date</h2>
                    <div style={{ 'backgroundColor': asap }} onClick={() => { setAsap('lightgrey'); setLater('white'); setStartDate(setHours(setMinutes(new Date(), minutes + 30), minutes > 30 ? currentTime + 1 : currentTime)) }} className="asap">As soon as possible - approx. 30 minutes from now!</div>
                    {/* <div style={{ 'backgroundColor': later }} onClick={() => { setLater('lightgrey'); setAsap('white'); setStartDate(setHours(setMinutes(new Date(), minutes + 30), minutes > 30 ? currentTime + 1 : currentTime)) }} className="asap">Schedule for later</div> */}
                    <p>Or schedule for later:</p>
                    <div onClick={() => { setLater('lightgrey'); setAsap('white') }}>
                        <DatePicker
                            selected={startDate.getDate() < today.getDate() ? today : startDate}
                            minDate={today}
                            // maxDate={today.getDate() + 7 } add 7 days to book at a time
                            onChange={date => setStartDate(date)}
                            style={{ 'backgroundColor': later }}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            // inline
                            // withPortal
                            minTime={currentTime > openingHour.slice(0, 2) && currentTime < closingHour.slice(0, 2) && today.getDate() === startDate.getDate() ? setHours(setMinutes(new Date(), 0), currentTime + 1) : setHours(setMinutes(new Date(), 0), openingHour.slice(0, 2))}
                            maxTime={setHours(setMinutes(new Date(), 0), closingHour.slice(0, 2))}
                        />
                    </div>
                </div>
                <div className="payment">
                    <h2>Pay by card</h2>
                    <label>Card details</label>
                    <div id="card">
                        <input style={{ 'border': cardError }} value={cardNumber} onChange={(event) => { setCardNumber(event.target.value); setCardError('') }} className="form-control card-number" placeholder="XXXX XXXX XXXX XXXX" />
                        <img id="cardImg" src="./img/cards.png" alt="cards" />
                    </div>
                    <div id="cardWrap">
                        <input style={{ 'border': expirationError }} value={expirationDate} onChange={(event) => { setExpirationDate(event.target.value); setExpirationError('') }} className="form-control expiration" placeholder="MM / YY" />
                        <input style={{ 'border': securityError, 'borderLeft': securityError }} value={securityNumber} onChange={(event) => { setSecurityNumber(event.target.value); setSecurityError('') }} className="form-control security" placeholder="CVC" />
                    </div>
                    <label id="cardLabel">Name on card</label>
                    <input style={{ 'border': nameError }} value={cardName} onChange={(event) => { setCardName(event.target.value); setNameError('') }} className="form-control card-name" placeholder="John Doe" />
                    <button onClick={orderNow} className="orange-button">Pay {!order ? 'now!' : order.total + ' DKK'}</button>
                </div>
            </div>
        </div >
    )
}

export default Payment;

if (document.getElementById('payment')) {
    ReactDOM.render(<Payment />, document.getElementById('payment'));
}