import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { storage } from '../../../firebase';

const RestaurantProfile = () => {
    // Redux
    const logged_out = useSelector(state => state.restaurantsReducer.logged_out);
    const profile_updated = useSelector(state => state.restaurantsReducer.profile_updated);
    const restaurant = useSelector(state => state.restaurantsReducer.restaurant);
    console.log(logged_out)
    console.log(restaurant && restaurant.id)
    const dispatch = useDispatch();
    let history = useHistory();
    const localStorageData = localStorage.getItem('email')
    const [iID, setID] = useState('');
    const [sName, setName] = useState('');
    const [sEmail, setEmail] = useState('');
    const [sPhone, setPhone] = useState('');
    const [sAddress, setAddress] = useState('');
    const [sCity, setCity] = useState('');
    const [sPostcode, setPostcode] = useState('');
    const [sCountry, setCountry] = useState('');
    const [sDescription, setDescription] = useState('');
    const [sBannerUrl, setBannerUrl]= useState('');
    const [sLogoUrl, setLogoUrl] = useState('');
    const [sOpeningHour, setOpeningHour] = useState('');
    const [sClosingHour, setClosingHour] = useState('');
    const [aCategories, setCategories] = useState([]);
    const [aCheckedItems, setCheckedItems] = useState({
        selected: []
    });
    const [checked, setChecked] = useState(false)



    //GET RESTAURANT FROM DB
    useEffect(() => {
        axios.get('/api/getRestaurant', { params: { id: localStorageData } })
            .then(response => {
                console.log({ 'RESTAURANT_DATA': response.data })
                setID(response.data.restaurant.id);
                setName(response.data.restaurant.name);
                setPhone(response.data.restaurant.phone);
                setEmail(response.data.restaurant.email);
                setAddress(response.data.restaurant.address);
                setCity(response.data.restaurant.city);
                setPostcode(response.data.restaurant.postcode);
                setDescription(response.data.restaurant.profile.description);
                setOpeningHour(response.data.restaurant.profile.opening_hour);
                setClosingHour(response.data.restaurant.profile.closing_hour);
                setLogoUrl(response.data.restaurant.profile.logo);
                setBannerUrl(response.data.restaurant.image);
            })
            .catch(error => {
                console.log(error);
            })
    }, [profile_updated])

    return (
     <div className="profile-page">
        <div className="restaurant-card container">
            <div className="card card-shadow mb-3">
                <div className="profile-header" style={{backgroundImage: `url('${sBannerUrl}')`}}>
                    <div className="card-img-overlay">
                        <h1 >{sName}</h1>
                        <Link to="/update-profile"><button className="grey-btn">Edit</button></Link>
                    </div>
                </div>
                <div className="card-body">
                    <div className="profile">
                        <h2 className="orange-text">COMPANY INFORMATION</h2>
                        <div>
                            <h3>Contact details</h3>
                            <p>Email: {sEmail} </p>
                            <p>Phone: {sPhone} </p>
                            <p>{sAddress}<br/>
                            {sCity}<br/>
                            {sPostcode}<br/>
                            </p>
                        </div>
                            <h3>Company details</h3>
                            <label className="form-label">Company Name</label>
                            <p>{sName}</p>
                            <p>Description: {sDescription}</p>        
                            <p>Opening hours: {sOpeningHour}</p>
                            <p>Closing hours: {sClosingHour}</p>
                        </div>
                    </div>
                </div>
       
            </div>
        </div>
    );
}

export default RestaurantProfile;

