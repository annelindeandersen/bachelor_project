import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { storage } from '../../../firebase';
import swal from 'sweetalert';
import moment from 'moment';


const ProfileForm = () => {
    // Redux
    const logged_out = useSelector(state => state.restaurantsReducer.logged_out);
    const profile_updated = useSelector(state => state.restaurantsReducer.profile_updated);
    const restaurant = useSelector(state => state.restaurantsReducer.restaurant);
    const checkbox_changed = useSelector(state => state.restaurantsReducer.checkbox_changed);
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
    const [iFile, setFile] = useState(null);
    const [sUrl, setUrl] = useState('');
    const [sBannerUrl, setBannerUrl] = useState('');
    const [sImage, setImage] = useState('');
    const [sOpeningHour, setOpeningHour] = useState('');
    const [sClosingHour, setClosingHour] = useState('');
    const [aCategories, setCategories] = useState([]);
    const [aSelectedCategories, setSelectedCategories] = useState([]);
    const [aCountries, setCountries] = useState([]);
    const [aCheckedItems, setCheckedItems] = useState({
        selected: []
    });
    const [isChecked, setIsChecked] = useState('');
    const [logoProgress, setLogoProgress] = useState(0);
    const [bannerProgress, setBannerProgress] = useState(0);


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
                setBannerUrl(response.data.restaurant.image);
                setDescription(response.data.restaurant.profile.description);
                setOpeningHour(response.data.restaurant.profile.opening_hour);
                setClosingHour(response.data.restaurant.profile.closing_hour);
                setUrl(response.data.restaurant.profile.logo);

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


    //get selected categories
    useEffect(() => {
        axios.post(`/api/getSelectedCategories`, {
            'id': iID
        })
            .then(response => {
                console.log({ 'CATEGORIES': response.data })
                setSelectedCategories(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [checkbox_changed, restaurant])

    //category select
    const handleCategory = (e) => {
        const checked = e.target.checked;

        const selectedCategory = parseInt(e.target.name);
        if (checked) {
            console.log({ 1: checked })
            axios.post('/api/addCategory', {
                id: iID,
                category: selectedCategory
            })
                .then(function (response) {
                    console.log(response);
                    dispatch({ type: 'CHECKBOX_CHANGED', checkbox_changed: true });
                    dispatch({ type: 'CHECKBOX_CHANGED', checkbox_changed: false });

                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        else if (checked === false) {
            console.log({ 2: checked })
            console.log(selectedCategory + 'unchekced')
            axios.post('/api/removeCategory', {
                id: iID,
                category: selectedCategory
            })
                .then(function (response) {
                    console.log(response);
                    setIsChecked(false)
                    dispatch({ type: 'CHECKBOX_CHANGED', checkbox_changed: true });
                    dispatch({ type: 'CHECKBOX_CHANGED', checkbox_changed: false });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }


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
            country_id: sCountry,
            description: sDescription,
            logo: sUrl,
            image: sBannerUrl,
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
                dispatch({ type: 'PROFILE_UPDATED', profile_updated: true });
                if (response.status === 200) {
                    var elem = document.createElement("div");
                    elem.innerHTML = "View your profile <a href='/restaurant-dashboard'>on the dashboard</a>";
                    swal({
                        text: "Profile updated",
                        icon: "success",
                        content: elem,
                        button: false
                    })
                }
            }).catch((err) => {
                console.log(err);
            })
    }


    const handleChange = (e) => {
        if (e.target.files[0]) {
            let file = e.target.files[0]
            let reader = new FileReader();
            if (file && file.type.match('image.*')) {
                reader.readAsDataURL(file);
            }
            reader.onload = (e) => {
                setFile(e.target.result)
            }
        }
    }

    const handleLogoUpload = (e) => {
        e.preventDefault()
        const uploadTask = storage.ref(`/images/${iID + sName}-logo`).putString(iFile.substring(23), 'base64');
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setLogoProgress(progress)
            },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref('images')
                    .child(`${iID + sName}-logo`)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url)
                        setUrl(url);

                    });
            });
    };

    useEffect(() => {
        axios.post(`/api/uploadLogo`, {
            id: iID,
            url: sUrl
        })
            .then(response => {
                console.log(response)

            })
            .catch(error => {
                console.log(error)
            })
    }, [sUrl]);


    //banner upload
    const handleBannerUpload = (e) => {
        e.preventDefault()
        console.log(iFile)
        const uploadTask = storage.ref(`/images/${iID + sName}s-banner`).putString(iFile.substring(23), 'base64');
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setBannerProgress(progress)
            },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref('images')
                    .child(`${iID + sName}s-banner`)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url)
                        setBannerUrl(url);
                    });
            });
    };


    useEffect(() => {
        axios.post(`/api/uploadBanner`, {
            id: iID,
            url: sBannerUrl
        })
            .then(response => {
                console.log(response)
                console.log(sBannerUrl)

            })
            .catch(error => {
                console.log(error)
            })
    }, [sBannerUrl]);

    return (
        <div className="profile-form-body">
            <div className="container profile-form-card">
                <h1 className="pb-3 orange-text text-center">Edit your restaurant details</h1>
                <div className="card border-0 card-shadow">
                    <div className="card-body">
                        <h2 className="pb-3 text-center">Contact Details</h2>

                        <div className="col-sm-12">
                            <label className="form-label">Restaurant Name</label>
                            <input type="text" value={sName} onChange={e => setName(e.target.value)} name="name" placeholder="Restaurant name" className="underline-input"></input>
                            <div className="detail-wrap">
                                <div>
                                    <label className="form-label">Email address</label>
                                    <input type="text" value={sEmail} onChange={e => setEmail(e.target.value)} name="email" placeholder="Email" className="underline-input"></input>
                                </div>
                                <div>
                                    <label className="form-label">Phone number</label>
                                    <input type="text" value={sPhone} onChange={e => setPhone(e.target.value)} name="phone" placeholder="Phone" className="underline-input"></input>
                                </div>
                            </div>
                            <label className="form-label">Address</label>
                            <input type="text" value={sAddress} onChange={e => setAddress(e.target.value)} name="address" placeholder="Address" className="underline-input"></input>
                            <div className="detail-wrap">
                                <div>
                                    <label className="form-label">City</label>
                                    <input type="text" value={sCity} onChange={e => setCity(e.target.value)} name="city" placeholder="City" className="underline-input"></input>
                                </div>
                                <div>
                                    <label className="form-label">Postcode</label>
                                    <input type="text" value={sPostcode} onChange={e => setPostcode(e.target.value)} name="postcode" placeholder="Postcode" className="underline-input"></input>
                                </div>
                            </div>
                            <label className="form-label">Country</label><br />
                            <select id="countries_select" value={sCountry} onChange={e => setCountry(e.target.value)}>
                                {
                                    aCountries.map((country, index) => (
                                        <option key={index} value={country.id}>{country.name}</option>
                                    ))
                                }
                            </select><br />
                            <div className="detail-wrap mt-4">
                                <div>
                                    <label className="form-label time">Opening time</label><br />
                                    <input type="time" name="appt" min="00:01" max="23:59" value={sOpeningHour} onChange={e => setOpeningHour(e.target.value)} ></input><br />
                                </div>
                                <div>
                                    <label className="form-label time">Closing time</label><br />
                                    <input type="time" name="appt" min="00:01" max="23:59" value={sClosingHour} onChange={e => setClosingHour(e.target.value)}></input><br />
                                </div>
                            </div>

                            <label className="form-label pt-5">Description</label>
                            <textarea name="description" id="addDescription" placeholder="Enter a description" className="underline-input" value={sDescription} onChange={e => setDescription(e.target.value)}></textarea><br />
                            <input id="" type="submit" onClick={save} value="Save" className="grey-btn mt-5" />
                        </div>
                    </div>
                </div>
                <div className="card mt-5 card-shadow">
                    <h2 className="pb-3     text-center">RESTAURANT CATEGORIES</h2>
                    <div className="card-body">
                        <label className="form-label">RESTAURANT CATEGORIES</label>
                        <div className=" d-flex flex-wrap category-tags justify-content-center mt-3" >
                            {aCategories && aCategories.map((item, i) => (
                                <label key={i} className="custom-checkbox">
                                    <input type="hidden" name={item.id} value='False' />
                                    <input className="custom-checkbox-input"
                                        name={item.id} value="True" type="checkbox" readOnly checked={aSelectedCategories.includes(item.id) ? true : false}
                                        onClick={(e) => handleCategory(e)} />
                                    <div className="custom-checkbox-text">{item.category} </div>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="mt-0 card-title text-center">Edit logo</h2>
                                <div className="card-body pt-5 mt-5 border">
                                    <div className="upload-img-container">
                                        <img src={sUrl} className="form-image" />
                                    </div>
                                </div>
                                <progress id="file" value={logoProgress} max="100"></progress><br />
                                <input type="file" onChange={handleChange} className="pt-3" />
                                <a href="#" className="grey-btn mt-2" onClick={handleLogoUpload}>Upload</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="mt-0  card-title text-center">Edit banner image</h2>
                                <div className="card-body pt-5 mt-5 border">
                                    <div className="upload-img-container">
                                        <img src={sBannerUrl} className="form-image" />
                                    </div>
                                </div>
                                <progress id="file" value={bannerProgress} max="100"></progress>
                                <input type="file" onChange={handleChange} className="pt-3" />
                                <a href="#" className="grey-btn mt-2" onClick={handleBannerUpload}>Upload</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileForm;