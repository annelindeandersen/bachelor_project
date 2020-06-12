import React, { useEffect, useState, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setHours, setMinutes, addDays } from 'date-fns';
import moment from 'moment';
import DatePicker from './components/DatePicker';
import CardPayment from './components/CardPayment';
const Payment = () => {
    // variables and states for date & time
    const currentMonth = Number((new Date()).getMonth() + 1)
    const today = moment();
    const currentYear = moment().year();
    const currentDay = moment().date();
    const currentStamp = moment(today).unix();
    const [dateSelected, setDateSelected] = useState(moment(today).format('LLLL'));
    // setting the date
    const [day, setDay] = useState(currentDay);
    const [month, setMonth] = useState({ name: moment(currentMonth).format('M'), value: currentMonth });
    const [time, setTime] = useState(moment().add(60, 'minutes').hours());
    // restaurant opening and closing hours
    const [openingHour, setOpeningHour] = useState('');
    const [closingHour, setClosingHour] = useState('');
    const monthsInYear = moment.months()
    const daysInMonth = moment(`${currentYear}-${month.value}`).daysInMonth();
    let dayRows = []
    for (let i = 1; i < daysInMonth + 1; i++) {
        const date = moment(`${currentYear}-${month.value}-${i}`).weekday()
        const pastDate = moment(`${currentYear}-${month.value}-${i}`).isBefore(today.format('Y-MM-DD'))
        const sevenDays = moment(`${currentYear}-${month.value}-${i}`).isAfter(moment(today).add(7, 'days').format('Y-MM-DD'))
        const dateText = moment.weekdays(date)
        dayRows.push(<option key={i} value={i} disabled={pastDate || sevenDays}>{i} - {(dateText)}</option>)
    }
    const hoursOpen = Number(closingHour.slice(0, 2)) - Number(openingHour.slice(0, 2))
    let timeRows = []
    for (let i = 1; i <= hoursOpen + 1; i++) {
        timeRows.push(<option key={i} disabled={i + Number(openingHour.slice(0, 2)) - 1 < moment().hour() + 1} value={i + Number(openingHour.slice(0, 2)) - 1}>{i + Number(openingHour.slice(0, 2)) - 1}:00</option>)
    }
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
    const [validation, setValidation] = useState('');
    // redux & history
    const restaurantId = useSelector(state => state.ordersReducer.restaurant);
    const order = useSelector(state => state.ordersReducer.cart);
    const user = useSelector(state => state.usersReducer.user);
    const logout = useSelector(state => state.usersReducer.logout);
    const dispatch = useDispatch();
    const history = useHistory();
    console.log({ 'SELECTED': dateSelected });
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
                console.log({ "RESPONS": response.data });
                setOpeningHour(response.data.profile.opening_hour);
                setClosingHour(response.data.profile.closing_hour);
            })
            .catch(err => {
                console.log(err);
            })
    }, [restaurantId])
    const orderNow = () => {
        if (cardNumber.length !== 16) {
            console.log('has to be 16')
            setValidation(false);
            setCardError('1px solid red');
        }
        if (expirationDate.length !== 5) {
            console.log('has to be 5')
            setValidation(false);
            setExpirationError('1px solid red');
        }
        if (securityNumber.length !== 3) {
            console.log('has to be 3')
            setValidation(false);
            setSecurityError('1px solid red');
        }
        if (cardName.length < 4) {
            console.log('has to be more than 3')
            setValidation(false);
            setNameError('1px solid red');
        }
        // if (currentTime > Number(closingHour.slice(0, 2))) {
        //     console.log('The restaurant does not have enough time today. Pick another day.')
        //     setValidation(false);
        //     setNameError('1px solid red');
        // }
        // if (cardNumber.length === 16 && expirationDate.length === 5 && securityNumber.length === 3 && cardName.length > 3) {
        if (validation !== false) {
            axios.post('/api/createorder', {
                id: order.user.id,
                restaurant: restaurantId,
                date: moment(dateSelected).format('YYYY-MM-DD HH:mm')
            })
                .then(response => {
                    console.log(response);
                    dispatch({ type: 'GET_ORDER', order: response.data });
                    deleteAll();
                    dispatch({ type: "DELETE_ONE", deleted: true })
                })
                .catch(error => {
                    console.log(error);
                    console.log(restaurantId, moment(dateSelected).format('YYYY-MM-DD HH:mm'), order.user.id);
                })
        }
    }
    // delete items from cart after creating order
    const deleteAll = () => {
        axios.post('/api/deleteall', {
            user: order.user.id
        }) //user.id })
            .then(response => {
                console.log(response);
                history.push('/receipt');
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div id="payment" className="page">
            <div className="payment-wrapper">
                <DatePicker today={today} day={day} currentMonth={currentMonth} monthsInYear={monthsInYear} month={month} asap={asap} later={later} dateSelected={dateSelected} setDateSelected={setDateSelected} setAsap={setAsap} setLater={setLater} setDay={setDay} setMonth={setMonth} setTime={setTime} time={time} timeRows={timeRows} dayRows={dayRows} user={user} order={order} />
                <CardPayment user={user} restaurantId={restaurantId} nameError={nameError} setNameError={setNameError} cardError={cardError} cardName={cardName} cardNumber={cardNumber} setCardError={setCardError} setCardName={setCardName} setCardNumber={setCardNumber} order={order} expirationDate={expirationDate} expirationError={expirationError} setExpirationDate={setExpirationDate} setExpirationError={setExpirationError} securityError={securityError} securityNumber={securityNumber} setSecurityError={setSecurityError} setSecurityNumber={setSecurityNumber} orderNow={orderNow} />
            </div>
        </div >
    )
}
export default Payment;
if (document.getElementById('payment')) {
    ReactDOM.render(<Payment />, document.getElementById('payment'));
}