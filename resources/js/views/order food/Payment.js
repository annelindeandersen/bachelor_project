import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import DatePicker from "react-datepicker";
import { setHours, setMinutes } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

const Payment = () => {
    // variables and states for date & time
    const [startDate, setStartDate] = useState(new Date());
    const today = new Date();
    const currentTime = today.getHours();
    const [openingHour, setOpeningHour] = useState('');
    const [closingHour, setClosingHour] = useState('');

    // redux & history
    const restaurantId = useSelector(state => state.ordersReducer.restaurant);
    const user = useSelector(state => state.usersReducer.user);
    const history = useHistory();

    console.log(restaurantId, openingHour, closingHour, currentTime);
    console.log({ today: today.toISOString().substring(0, 10) + ' ' + today.toISOString().substring(11, 16) });

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

        axios.post('/api/createorder', { id: user.id, restaurant: restaurantId, date: startDate.toISOString().substring(0, 10) + ' ' + startDate.toISOString().substring(11, 16) })
            .then(response => {
                console.log(response);
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

    return (
        <div className="container">
            <br />
            <h2>Pick time & date</h2>
            <DatePicker
                selected={startDate.getDate() < today.getDate() ? today : startDate}
                minDate={today}
                onChange={date => setStartDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                // inline
                withPortal
                minTime={currentTime > openingHour.slice(0, 2) && currentTime < closingHour.slice(0, 2) && today.getDate() === startDate.getDate() ? setHours(setMinutes(new Date(), 0), currentTime + 1) : setHours(setMinutes(new Date(), 0), openingHour.slice(0, 2))}
                maxTime={setHours(setMinutes(new Date(), 0), closingHour.slice(0, 2))}
            />
            <br />
            <h2>Enter your payment details</h2>
            <br />
            <br />
            <button onClick={orderNow} className="green-button">Pay now!</button>
        </div >
    )
}

export default Payment;

if (document.getElementById('payment')) {
    ReactDOM.render(<Payment />, document.getElementById('payment'));
}