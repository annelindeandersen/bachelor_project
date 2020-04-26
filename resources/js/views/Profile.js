import React from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
    return (
        <div className="container">
            <h1>Profile</h1>
        </div>
    )
}

export default Profile;

if (document.getElementById('profile')) {
    ReactDOM.render(<Profile />, document.getElementById('profile'));
}