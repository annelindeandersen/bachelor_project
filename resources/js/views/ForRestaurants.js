import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom';


const ForRestaurants = () => {
    return (
        <div className="restaurants-page">
            <div className="restaurants-container  container">
                <div className="join-us">
                    <h1 className="heading">Why join us?</h1>
                    <p className="heading-p">In a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live.</p>
                    <Link to="/register" ><button className="btn orange-button">Signup</button></Link>
                </div>
            </div>
        </div>
    )
}

export default ForRestaurants;