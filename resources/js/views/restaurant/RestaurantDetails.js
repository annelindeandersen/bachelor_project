import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const RestaurantDetails = () => {
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
    const [iFile, setFile] = useState('');
    const [sImage, setImage] = useState('');
    const [sOpeningHour, setOpeningHour] = useState('');
    const [sClosingHour, setClosingHour] = useState('');
    const [sMessage, setMessage] = useState('');
    const [aCategories, setCategories] = useState([]);
    const [aCountries, setCountries] = useState([]);
    const [aCheckedItems, setCheckedItems] = useState({
        selected: []
    });
    const [checked, setChecked] = useState(false)

    //get countries for select options
    const getCountries = async () => {
        const result = await fetch('/api/getCountries', {
            method: 'get',
            methods: {
                'Content-Type': 'aplication/json',
            }
        });
        const data = await result.json();
        setCountries(data);
    }
    useEffect(() => {
        getCountries();
    }, []);

    //GET RESTAURANT FROM DB
    useEffect(() => {
        // const getRestaurantData = async () => {

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
                setCountry(response.data.restaurant.country_id);
                setDescription(response.data.restaurant.profile.description);
                setOpeningHour(response.data.restaurant.profile.opening_hour);
                setClosingHour(response.data.restaurant.profile.closing_hour);
                setImage(response.data.restaurant.profile.logo);
            })
            .catch(error => {
                console.log(error);
            })
    }, [profile_updated])

    //get categories to select
    useEffect(() => {
        axios.get(`/api/getcategories`)
            .then(response => {
                setCategories(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    //handle category selction
    const handleSelect = (e) => {
        const checked = e.target.checked;
        const selectedCategory = parseInt(e.target.value);
        if (checked) {
            setCheckedItems({
                selected: [...aCheckedItems.selected, selectedCategory]
            })
            //    console.log(aCheckedItems)
        } else {
            setCheckedItems({
                selected: aCheckedItems.selected.filter(selectedItem => selectedItem !== selectedCategory)
            })
        }
        // console.log(aCheckedItems)
    }
    // const onChange = (event) => {
    //     console.log(event.target.value)
    // let file = e.target.files[0]
    // let reader = new FileReader();
    // if (file && file.type.match('image.*')) {
    //     reader.readAsDataURL(file);
    // }
    // reader.onload = (e) => {
    //     // console.log(e.target.result)
    //     setFile(e.target.result)
    // }
    // }
    const formData = {
        method: 'POST',
        url: '/api/updateProfile',
        data: {
            id: iID,
            name: sName,
            email: sEmail,
            phone: sPhone,
            address: sAddress,
            city: sCity,
            postcode: sPostcode,
            city: sCity,
            country_id: sCountry,
            description: sDescription,
            logo: iFile,
            opening_hour: sOpeningHour,
            closing_hour: sClosingHour,
            categories: aCheckedItems.selected
        }
    }

    const save = (e) => {
        e.preventDefault();
        console.log(aCheckedItems.selected)
        axios(formData)
            .then(response => {
                console.log(response);
                dispatch({ type: 'CURRENT_USER', profile_updated: true });
            }).catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className="container">
            {/* <h1>{restaurant.name}</h1> */}
            <img src="./img/4.jpg" alt="test" />
            <div>
                <input type="text" value={sName} onChange={e => setName(e.target.value)} name="name" placeholder="Restaurant name"></input>
                <input type="text" value={sEmail} onChange={e => setEmail(e.target.value)} name="email" placeholder="Email"></input>
                <input type="text" value={sPhone} onChange={e => setPhone(e.target.value)} name="phone" placeholder="Phone"></input>
                <input type="text" value={sAddress} onChange={e => setAddress(e.target.value)} name="address" placeholder="Address"></input>
                <input type="text" value={sPostcode} onChange={e => setPostcode(e.target.value)} name="postcode" placeholder="Postcode"></input>
                <input type="text" value={sCity} onChange={e => setCity(e.target.value)} name="city" placeholder="City"></input>
                <select id="countries_select" value={sCountry} onChange={e => setCountry(e.target.value)}>
                    {/* <option selected="selected">Select a country</option> */}
                    {
                        aCountries.map((country, index) => (
                            <option key={index} value={country.id}>{country.name}</option>
                        ))
                    }
                </select>
                <textarea value={sDescription} onChange={e => setDescription(e.target.value)} name="description" id="addDescription" className="form-control" placeholder="description"></textarea><br />
                <label htmlFor="appt">Opening time:</label>
                <input type="time" id="openingTime" name="opening_hour" min="09:00" max="18:00" required value={sOpeningHour} onChange={e => setOpeningHour(e.target.value)} />
                <label htmlFor="appt">Closing time:</label>
                <input type="time" id="openingTime" name="opening_hour" min="09:00" max="18:00" required value={sClosingHour} onChange={e => setClosingHour(e.target.value)} />
                <input type="file" accept="image/*" name="logo" onChange={(e) => onChange(e)} name="logo" id="image" className="form-control" placeholder="image" /><br />
                {aCategories && aCategories.map((item, i) => (
                    <label key={i}>
                        <input type="checkbox"
                            value={item.id}
                            name={item.category}
                            onChange={(e) => handleSelect(e)} />
                        <span className="check" ></span>
                        {item.category}
                    </label>
                ))}
                <input id="" className="form-control" type="submit" onClick={save} value="Save" />
                {sMessage ?
                    <div>
                        <a href="">{sMessage}</a>
                    </div> : ''
                }
            </div>
        </div>
    );
}

export default RestaurantDetails;
if (document.getElementById('dashboard')) {
    ReactDOM.render(<RestaurantDetails />, document.getElementById('dashboard'));
}
