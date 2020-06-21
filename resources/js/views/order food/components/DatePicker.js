import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const DatePicker = ({ today, day, currentMonth, monthsInYear, month, asap, later, dateSelected, setDateSelected, setAsap, setLater, setDay, setMonth, setTime, time, timeRows, dayRows, user, order }) => {
    const [opacity, setOpacity] = useState(0);
    const [margin, setMargin] = useState('-10px');

    return (
        <div className="datepicker">
            <div className="flex"><h2>Review order from</h2><img className="payment-logo" src="./img/delivr-3.png" alt="logo" /></div>
            <div className="payment-order">
                {!order ? '' : Object.keys(order.items).map((item, index) => (
                    <div className="payment-order-item" key={index}>
                        <strong>{order.items[item].length + ' x ' + item}</strong>
                        <p>{order.items[item][0].menu_item.price * order.items[item].length} DKK</p>
                    </div>
                ))}
            </div>
            <h2>Delivery to</h2>
            <input className="form-control payment-address" disabled={true} placeholder={!user ? order && order.cart.user.address + ', ' + order.cart.user.postcode + ' ' + order.cart.user.city : user.address + ', ' + user.postcode + ' ' + user.city} />
            <Link to="/profile"><i>Go to profile to change delivery address.</i></Link>
            <h2>Pick time & date</h2>

            <div style={{ 'backgroundColor': asap }} onClick={() => { setAsap('lightgrey'); setLater(''); setOpacity(0); setMargin('-10px'); setDateSelected(moment(today).add(30, 'minutes').format('LLLL')) }} className="asap">As soon as possible - <i>approx. 30 minutes from now!</i></div>

            <button style={{ 'backgroundColor': later }} className="asap example-custom-input" onClick={() => { setDateSelected(moment(today).add(60, 'minutes').format('LLLL')); setOpacity(1); setMargin('0px'); setLater('lightgrey'); setAsap('') }}>
                {later === '' ? <i>Schedule for later - click here </i> : ''} {later === '' ? '' : dateSelected}
            </button>
            <div id="dates" style={{ 'marginTop': margin }}>
                <select style={{ 'opacity': opacity, 'transition': 'opacity 500ms ease' }} className="form-control date-picker" value={month.name} id="month" onChange={(event) => {
                    setMonth({ name: event.target.value, value: Number(moment().month(event.target.value).format("M")) });
                }}>
                    {monthsInYear.map((month) => (
                        <option key={month} value={month} disabled={moment().months(month).format('M') < currentMonth || moment().months(month).format('M') > currentMonth}>{month}</option>
                    ))}
                </select>
                <select style={{ 'opacity': opacity, 'transition': 'opacity 500ms ease' }} className="form-control date-picker" value={day} id="day" onChange={(event) => {
                    setDay(Number(event.target.value));
                }}>
                    {dayRows}
                </select>
                <select style={{ 'opacity': opacity, 'transition': 'opacity 500ms ease' }} className="form-control date-picker" value={time} id="time" onChange={(event) => {
                    setTime(Number(event.target.value));
                }}>
                    {timeRows}
                </select>
            </div>
        </div>
    )
}

export default DatePicker;