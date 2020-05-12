import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const ForRestaurants = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="card">
                    <h1 className="card-header">Why join Delivr?</h1>
                    <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.</p>
                    <div>
                        <Link to="/restaurant-register"><button>Sign Up</button></Link>
                        <Link to="/restaurant-dashboard"><button>Dashboard</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ForRestaurants;
if (document.getElementById('for-restaurants')) {
    ReactDOM.render(<ForRestaurants />, document.getElementById('for-restaurants'));
}
