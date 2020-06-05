import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from "react-datepicker";
import { setHours, setMinutes, addDays } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

const Payment = () => {
    // variables and states for date & time
    const today = new Date();
    const currentTime = today.getHours();
    const minutes = today.getMinutes();
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

    const DateInput = ({ value, onClick }) => (
        <button style={{ 'backgroundColor': later }} className="asap example-custom-input" onClick={() => { onClick(); setLater('lightgrey'); setAsap('') }}>
            {later === '' ? <i>Schedule for later - click here </i> : ''} {later === '' ? '' : value}
        </button>
    );

    // redux & history
    const restaurantId = useSelector(state => state.ordersReducer.restaurant);
    const order = useSelector(state => state.ordersReducer.cart);
    const user = useSelector(state => state.usersReducer.user);
    const logout = useSelector(state => state.usersReducer.logout);
    const dispatch = useDispatch();
    const history = useHistory();

    console.log({ 'TODAY': today.getDate() });
    // console.log({ 'SELECTED': startDate.getDate(), startDate });
    console.log({ 'OPENING_HOUR': Number(openingHour.slice(0, 2)) });
    console.log({ 'CLOSING_HOUR': Number(closingHour.slice(0, 2)) });
    console.log({ 'CURRENT_TIME': currentTime });
    console.log({ 'CURRENT_MINUTE': minutes });
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

    // SETTING TIME AND START DATE FOR DATEPICKER ******** check if time is more or equal to opening hours
    const [startDate, setStartDate] = useState(
        currentTime >= Number(closingHour.slice(0, 2)) - 1 && currentTime < Number(closingHour.slice(0, 2))
            ?
            minutes > 15
                ?
                setHours(setMinutes(addDays(new Date(), 1), 0), Number(openingHour.slice(0, 2)))
                :
                setHours(setMinutes(new Date(), minutes + 45), minutes > 15 ? currentTime + 5 : currentTime)
            :
            currentTime > Number(closingHour.slice(0, 2)) || currentTime == Number(closingHour.slice(0, 2))
                ?
                setHours(setMinutes(addDays(new Date(), 1), 0), 12)
                :
                setHours(setMinutes(new Date(), minutes + 45), minutes > 15 ? currentTime + 1 : currentTime)
    );

    console.log({ 'START_DATE': startDate.getDate() })

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
        if (currentTime > Number(closingHour.slice(0, 2))) {
            console.log('The restaurant does not have enough time today. Pick another day.')
            setNameError('1px solid red');
        }

        if (currentTime < Number(closingHour.slice(0, 2)) && cardNumber.length === 16 && expirationDate.length === 5 && securityNumber.length === 3 && cardName.length > 3) {
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
        <div id="payment" className="page">
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
                    <input className="form-control payment-address" disabled={true} placeholder={!user ? order && order.cart.user.address + ', ' + order.cart.user.postcode + ' ' + order.cart.user.city : user.address + ', ' + user.postcode + ' ' + user.city} />
                    <Link to="/profile"><i>Go to profile to change delivery address.</i></Link>
                    <h2>Pick time & date</h2>
                    {startDate.getDate() > today.getDate() ?
                        ''
                        :
                        <div style={{ 'backgroundColor': asap }} onClick={() => { setAsap('lightgrey'); setLater(''); setStartDate(setHours(setMinutes(new Date(), minutes + 30), minutes > 30 ? currentTime + 1 : currentTime)) }} className="asap">As soon as possible - <i>approx. 30 minutes from now!</i></div>
                    }
                    <DatePicker
                        // check if the time and date are still suited for today
                        selected={startDate.getDate() < today.getDate()
                            ?
                            today
                            :
                            currentTime >= Number(closingHour.slice(0, 2)) - 1 && today.getDate() === startDate.getDate() && currentTime < Number(closingHour.slice(0, 2))
                                ?
                                minutes > 15
                                    ?
                                    setHours(setMinutes(addDays(startDate, 1), 0), Number(openingHour.slice(0, 2)))
                                    :
                                    startDate
                                :
                                currentTime >= Number(closingHour.slice(0, 2)) && today.getDate() === startDate.getDate()
                                    ?
                                    setHours(setMinutes(addDays(startDate, 1), 0), Number(openingHour.slice(0, 2)))
                                    :
                                    startDate
                        }
                        // check if the time and date are still suited for today
                        minDate={currentTime >= Number(closingHour.slice(0, 2)) - 1 && today.getDate() === startDate.getDate() && currentTime < Number(closingHour.slice(0, 2))
                            ?
                            minutes > 15
                                ?
                                addDays(today, 1)
                                :
                                today
                            :
                            currentTime >= Number(closingHour.slice(0, 2))
                                ?
                                addDays(today, 1)
                                :
                                today
                        }

                        maxDate={addDays(new Date(), 7)}
                        onChange={date => setStartDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        customInput={<DateInput />}
                        dateFormat="MMMM d, yyyy - HH:mm"
                        // if current time is more than opening hour
                        // and current time is less than closing hour
                        // and today is the date => get current hour + 1
                        // else get tomorrow at opening => add day to today
                        minTime={currentTime > Number(openingHour.slice(0, 2)) && currentTime < Number(closingHour.slice(0, 2)) && today.getDate() === startDate.getDate()
                            // minTime={currentTime > Number(openingHour.slice(0, 2)) && today.getDate() === startDate.getDate()
                            ?
                            setHours(setMinutes(new Date(), 0), currentTime + 1)
                            :
                            setHours(setMinutes(new Date(), 0), Number(openingHour.slice(0, 2)))}
                        maxTime={setHours(setMinutes(new Date(), 0), Number(closingHour.slice(0, 2)))}
                    />
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
                    <button onClick={orderNow} className="blue-button">Pay {!order ? 'now!' : order.total + ' DKK'}</button>
                </div>
            </div>
        </div >
    )
}

// export default Payment;

if (document.getElementById('payment')) {
    ReactDOM.render(<Payment />, document.getElementById('payment'));
}