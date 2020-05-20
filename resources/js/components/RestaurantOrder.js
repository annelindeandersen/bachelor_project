import React from 'react';


const RestaurantOrder = ({orders}) => {
  return (
    <div>
      <h1>Single order</h1>
        {orders && orders.map((order, i) => (
          <div key={i}>
            <h1>{order.id}</h1>
              <button name="accept" type="submit" value={order.id} onClick={(event) => accept(event.target.value)}>Accept</button>
              <button name="reject" type="submit" value={order.id} onClick={(event) => reject(event.target.value)}>Reject</button>
              <h1>{order.delivery_time}</h1>
              <h2>{order.total_price}</h2>
              <p></p>
              {order.order_item.map((item, i) => (
                <div key={i}>
                  <p>{item.menu_item.title}</p>
                  <p>{item.menu_item.description}</p>
                  <p>{item.menu_item.price} kr.</p>
                </div>
              ))}
          </div>
        ))}

  
    </div>
    
  )
}

export default RestaurantOrder;