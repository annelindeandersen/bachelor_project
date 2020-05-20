import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const CreateProfile = () => {
    const [sDescription, setDescription] = useState('');
    const [sImage, setImage] = useState('');
    const [sOpeningHour, setOpeningHour] = useState('');
    const [sClosingHour, setClosingHour] = useState('');
    const [sMessage, setMessage] = useState('');
    const save = async (e) => {
        try {
            e.preventDefault();
            const response = await fetch(`/api/createProfile/4`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    description: sDescription,
                    logo: sImage,
                    opening_hour: sOpeningHour,
                    closing_hour: sClosingHour,
                })
            });
            const data = await response.json();
            console.log(response)
            console.log(data)
            if (response.status === 201) {
                setMessage('Click here to view your restaurant page and see your profile')
                // sessionStorage.setItem('email', data.session_data);
                //  dispatch({ type: 'LOGOUT_USER', logout: false });
                //  dispatch({ type: 'CURRENT_USER', payload:data, sessionData });
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="container d-flex justify-content-center">
            <h1 className="card-header">Add restaurant details</h1>
            <textarea value={sDescription} onChange={(event) => setDescription(event.target.value)} name="description" id="addDescription" name="addDescription" className="form-control" placeholder="description"></textarea><br />
            <input value={sImage} onChange={(e) => setImage(e.target.value)} name="logo" id="image" className="form-control" placeholder="image" /><br />
            {/* <label htmlFor="img">Select image:</label>
            <input type="file" id="banner-image" name="image" accept="image/*" value={sImage} onChange={(e) => setImage(e.target.value)}/><br /> */}
            <label htmlFor="appt">Opeining time:</label>
            <input type="time" id="openingTime" name="opening_hour" min="09:00" max="18:00" required value={sOpeningHour} onChange={(event) => setOpeningHour(event.target.value)} />
            <label htmlFor="appt">Closing time:</label>
            <input type="time" id="openingTime" name="opening_hour" min="09:00" max="18:00" required value={sClosingHour} onChange={(event) => setClosingHour(event.target.value)} />
            <meta name="csrf-token" content="{{ csrf_token() }}" />
            <input id="registerButton" className="form-control" type="submit" value="Save" onClick={save} />
            {sMessage ?
                <div>
                    <a href="">{sMessage}</a>
                </div> : ''
            }
        </div>
    );
}
export default CreateProfile;
if (document.getElementById('createProfile')) {
    ReactDOM.render(<CreateProfile />, document.getElementById('createProfile'));
}
