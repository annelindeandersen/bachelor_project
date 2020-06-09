import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const ForRestaurants = () => {
    let location = useLocation();
    const logged_out = useSelector(state => state.restaurantsReducer.logged_out);
    let history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if(logged_out === true){
            // history.push('/');
        } 
    }, [logged_out]);

    return (
        <div className="page">
                <div className="plate-bg"></div>
            <div className="container">
       
                <div className="for-restaurant-text">  
                <div className="d-flex">             
                        <h1 className="">How it works</h1>   
                </div>    
                    <div>
                        <p className="join-us-text">Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.</p>
                        <Link to="/restaurant-register"><button className="signup-button">Sign Up</button></Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
export default ForRestaurants;
