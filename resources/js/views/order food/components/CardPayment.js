import React from 'react';

const CardPayment = ({ user, restaurantId, nameError, setNameError, cardError, cardName, cardNumber, setCardError, setCardName, setCardNumber, order, expirationDate, expirationError, setExpirationDate, setExpirationError, securityError, securityNumber, setSecurityError, setSecurityNumber, orderNow }) => {
    return (
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
            <button onClick={() => orderNow()} className="blue-button">Pay {!order ? 'now!' : order.total + ' DKK'}</button>
        </div>
    )
}

export default CardPayment;