import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setHours, setMinutes, addDays } from 'date-fns';
import moment from 'moment';

const Payment = () => {
    // variables and states for date & time
    const currentMonth = Number((new Date()).getMonth() + 1)
    const currentYear = moment().year();
    const today = moment();
    const currentDay = moment().date();
    const currentStamp = moment(today).unix();
    console.log(moment(today).format('LLLL'))
    const [dateSelected, setDateSelected] = useState(moment(today).format('LLLL'));

    // setting the date
    const [day, setDay] = useState('');
    const [month, setMonth] = useState({ name: '', value: '' });
    const [time, setTime] = useState('');

    // restaurant opening and closing hours
    const [openingHour, setOpeningHour] = useState('');
    const [closingHour, setClosingHour] = useState('');

    const monthsInYear = moment.months()
    const daysInMonth = moment(`${currentYear}-${month.value}`).daysInMonth();

    let dayRows = []
    for (let i = 1; i < daysInMonth + 1; i++) {
        // console.log(i);
        const date = moment(`${currentYear}-${month.value}-${i}`).weekday()
        const pastDate = moment(`${currentYear}-${month.value}-${i}`).isBefore(today.format('Y-MM-DD'))
        const dateText = moment.weekdays(date)
        dayRows.push(<option key={i} value={i} disabled={pastDate}>{i} - {(dateText)}</option>)
    }

    const hoursOpen = Number(closingHour.slice(0, 2)) - Number(openingHour.slice(0, 2))

    let timeRows = []
    for (let i = 1; i <= hoursOpen + 1; i++) {
        // console.log(i);
        timeRows.push(<option key={i} value={i + Number(openingHour.slice(0, 2)) - 1}>{i + Number(openingHour.slice(0, 2)) - 1}:00</option>)
    }

    console.log('DAY_ROWS', dayRows);
    console.log('TIME_ROWS', timeRows);

    useEffect(() => {
        setDateSelected(moment(new Date(currentYear, month.value - 1, day, time)).format('LLLL'))
    }, [month, day, time])

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
    const order = useSelector(state => state.ordersReducer.cart);
    const user = useSelector(state => state.usersReducer.user);
    const logout = useSelector(state => state.usersReducer.logout);
    const dispatch = useDispatch();
    const history = useHistory();

    // console.log({ 'TODAY': today.getDate() });
    console.log({ 'OPENING_HOUR': Number(openingHour.slice(0, 2)) });
    console.log({ 'CLOSING_HOUR': Number(closingHour.slice(0, 2)) });
    console.log({ 'MONTH': month });
    console.log({ 'DATE': day });
    // console.log({ today: today.toISOString().substring(0, 10) + ' ' + today.toISOString().substring(11, 16) });

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
        // console.log('clicked', user, restaurantId, startDate.toISOString().substring(0, 10) + ' ' + startDate.toISOString().substring(11, 16));

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
        // if (currentTime > Number(closingHour.slice(0, 2))) {
        //     console.log('The restaurant does not have enough time today. Pick another day.')
        //     setNameError('1px solid red');
        // }

        if (cardNumber.length === 16 && expirationDate.length === 5 && securityNumber.length === 3 && cardName.length > 3) {
            axios.post('/api/createorder', { id: user.id, restaurant: restaurantId, date: dateSelected })
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

                    <div style={{ 'backgroundColor': asap }} onClick={() => { setAsap('lightgrey'); setLater(''); setDateSelected(moment(today).format('LLLL')) }} className="asap">As soon as possible - <i>approx. 30 minutes from now!</i></div>

                    <button style={{ 'backgroundColor': later }} className="asap example-custom-input" onClick={() => { setLater('lightgrey'); setAsap('') }}>
                        {later === '' ? <i>Schedule for later - click here </i> : ''} {later === '' ? '' : dateSelected}
                    </button>
                    <div id="dates">
                        <select value={month.name} id="month" onChange={(event) => {
                            setMonth({ name: event.target.value, value: Number(moment().month(event.target.value).format("M")) });
                            // setNewOrder(true)
                        }}>
                            {monthsInYear.map((month) => (
                                <option key={month} value={month} disabled={moment().months(month).format('M') < currentMonth}>{month}</option>
                            ))}
                        </select>
                        <select value={day} id="day" onChange={(event) => {
                            setDay(Number(event.target.value));
                            // setNewOrder(true)
                        }}>
                            {dayRows}
                        </select>
                        <select value={time} id="time" onChange={(event) => {
                            setTime(Number(event.target.value));
                            // setNewOrder(true)
                        }}>
                            {timeRows}
                        </select>
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
                    <button onClick={orderNow} className="blue-button">Pay {!order ? 'now!' : order.total + ' DKK'}</button>
                </div>
            </div>
        </div >
    )
}

export default Payment;

if (document.getElementById('payment')) {
    ReactDOM.render(<Payment />, document.getElementById('payment'));
}