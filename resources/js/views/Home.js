import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom';


const Home = () => {
    let [category, setCategory] = useState('');
    let history = useHistory();

    useEffect(() => {
        console.log(history);
        if (category !== '') {
            console.log(category);
            history.push({
                pathname: '/login',
                state: category
            });
        }
    }, [category])

    return (
        <div className="background">
        <div className="home-container container">
            <div>
                <h1 className="logo text-center pt-5">~FOOD-APP~</h1>
                <div className="home-text">
                    <h1 className=" title pt-5 pb-4">Welcome to the Food App!</h1>
                    <p className="body-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
                <div className="home-options">
                <Link to="/food" onClick={() => setCategory('order-food')} className="home-menu">order food</Link>
                <Link to="/for-restaurants" onClick={() => setCategory('order-food')} className="home-menu">
                    <span className="menu-small">for</span>
                    <span>restaurants</span>
                </Link>
                <Link to="/volunteers" onClick={() => setCategory('order-food')} className="home-menu">
                <span className="menu-small">for</span>
                            <span>volunteers</span>
                </Link>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Home;