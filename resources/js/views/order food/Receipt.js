import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Receipt = () => {
    const [sUser, setUser] = useState('');
    const user = useSelector(state => state.usersReducer.user);
    const history = useHistory();

    useEffect(() => {
        // get user's name
        console.log(user);
        setUser(!user ? '' : user.first_name);
    }, [user])

    return (
        <div className="container">
            <br />
            <h2>Awesome, {sUser}! Your order has been placed!</h2>
        </div >
    )
}

export default Receipt;

if (document.getElementById('receipt')) {
    ReactDOM.render(<Receipt />, document.getElementById('receipt'));
}