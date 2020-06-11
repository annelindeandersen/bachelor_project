import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { storage } from './../../../firebase';
import swal from 'sweetalert';


const ProfileForm = () => {
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
    const [iFile, setFile] = useState(null);
    const [sUrl, setUrl]= useState('');
    const [sBannerUrl, setBannerUrl]= useState('');
    const [sImage, setImage] = useState('');
    const [sOpeningHour, setOpeningHour] = useState('');
    const [sClosingHour, setClosingHour] = useState('');
    const [sMessage, setMessage] = useState('');
    const [aCategories, setCategories] = useState([]);
    const [aCountries, setCountries] = useState([]);
    const [aCheckedItems, setCheckedItems] = useState({
        selected: []
    });
    const [checked, setChecked] = useState(false);
    const [logoProgress, setLogoProgress ] = useState(0);
    const [bannerProgress, setBannerProgress ] = useState(0);

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

    //handle category selection
    const handleSelect = (e) => {
        const checked = e.target.checked;
        const selectedCategory = parseInt(e.target.value);
        if (checked) {
            setCheckedItems({
                selected: [...aCheckedItems.selected, selectedCategory]
            })
               console.log(aCheckedItems)
        } else {
            setCheckedItems({
                selected: aCheckedItems.selected.filter(selectedItem => selectedItem !== selectedCategory)
            })
        }
        console.log(aCheckedItems)
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
                if (response.status === 200) {
                    var elem = document.createElement("div");
                    elem.innerHTML = "View your profile <a href='/restaurant-profile'>Profile</a>";
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
    if(e.target.files[0]) {
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

const handleLogoUpload = () => {
    console.log(iFile)
    const uploadTask = storage.ref(`/images/${iID}-logo.jpg`).putString(iFile.substring(23), 'base64');
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
      () =>   {
     storage
     .ref('images')
     .child(`${iID}-logo.jpg`)
     .getDownloadURL()
     .then(url => {
        console.log(url)
        setUrl(url);
            // swal({
            //     text: "File uploaded",
            //     icon: "success",
            //     // timer: 2000,
            //     button: false
            // })
     });
 });
};

useEffect(() => {
axios.post(`/api/uploadLogo`, {
    id: iID,
    url: sUrl
  })
.then(response => {


})
.catch(error => {
    console.log(error)
})
}, [sUrl]);


//banner upload
const handleBannerUpload = () => {
    console.log(iFile)
    const uploadTask = storage.ref(`/images/${iID}s-logo`).putString(iFile.substring(23), 'base64');
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
      () =>   {
     storage    
     .ref('images')
     .child(`${iID}s-logo`)
     .getDownloadURL()
     .then(url => {
        console.log(url)
        setBannerUrl(url);
        swal({
            text: "File uploaded",
            icon: "success",
            button: false
        })
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
    // if(response.status === 200) {
    //     swal("Success", "Banner updated","success");
    // }

})
.catch(error => {
    console.log(error)
})
}, [sBannerUrl]);

    return (
        <div class="profile-form-body">
        <div className="container profile-form-card">
 
        <div className="row">
            <div className="col-8">
            <div className=" card profile-form">
            <div>
            <h1 className="pb-3 orange-text text-center">EDIT YOUR BUSINESS DETAILS</h1>
                <label className="form-label">Restaurant Name</label>
                <input type="text" value={sName} onChange={e => setName(e.target.value)} name="name" placeholder="Restaurant name" className="underline-input"></input>
                <label className="form-label">Email address</label>
                <input type="text" value={sEmail} onChange={e => setEmail(e.target.value)} name="email" placeholder="Email" className="underline-input"></input>
                <label className="form-label">Phone number</label>
                <input type="text" value={sPhone} onChange={e => setPhone(e.target.value)} name="phone" placeholder="Phone" className="underline-input"></input>
                <label className="form-label">Address</label>
                <input type="text" value={sAddress} onChange={e => setAddress(e.target.value)} name="address" placeholder="Address" className="underline-input"></input>
                <label className="form-label">City</label>
                <input type="text" value={sCity} onChange={e => setCity(e.target.value)} name="city" placeholder="City" className="underline-input"></input>
                <label className="form-label">Postcode</label>
                <input type="text" value={sPostcode} onChange={e => setPostcode(e.target.value)} name="postcode" placeholder="Postcode" className="underline-input"></input>
                <label className="form-label">Country</label><br />
                <select id="countries_select" value={sCountry} onChange={e => setCountry(e.target.value)}>
                    {/* <option selected="selected">Select a country</option> */}
                    {
                        aCountries.map((country, index) => (
                            <option key={index} value={country.id}>{country.name}</option>
                        ))
                    }
                </select><br/>
                <label className="form-label pt-4">Description</label>
                <textarea name="description" id="addDescription" placeholder="Enter a description" className="underline-input" value={sDescription} onChange={e => setDescription(e.target.value)}></textarea><br />
                <label htmlFor="appt" className="form-label">Opening time: </label>
                <input type="time" id="openingTime" name="opening_hour" min="00:00" max="06:00" required value={sOpeningHour} onChange={e => setOpeningHour(e.target.value)} />
                <label htmlFor="appt" className="form-label pl-5">Closing time: </label>
                <input type="time" id="openingTime" name="opening_hour" min="00:00" max="06 :00" required value={sClosingHour} onChange={e => setClosingHour(e.target.value)} /><br />
                <label className="form-label pt-5">CATEGORIES</label>
                <div className=" d-flex justify-content-between">
                
                {aCategories && aCategories.map((item, i) => (
                        <div key={i}  className="btn-group-toggle d-flex tags">
                            <label className="btn">
                                <input type="checkbox" 
                                className="checkbox-input"
                                value={item.id} 
                                name={item.category}    
                                onChange={(e) => handleSelect(e)} 
                                />  {item.category}
                            </label>
                        </div>
                ))}
                </div>
                <input id="" type="submit" onClick={save} value="Save" className="grey-btn mt-5"/>
                {sMessage ?
                    <div>
                        <a href="">{sMessage}</a>
                    </div> : ''
                }
            </div>
         </div>
            </div>
            <div className="col-4 pl-0 pt-5">
                <h2>IMAGE UPLOAD</h2>
                <p>Images accepted are jpg and jpeg</p>
            <div className="card img-upload">
           
                <div className="form-image-divs">
                </div>
                <div className="card-body">
                <h3 className="mt-0 card-title">Upload a logo</h3>
                    <div className="upload-img-container">
                        <img src={sUrl}  className="form-image"/>
                    </div>
                    <progress id="file" value={logoProgress} max="100"></progress><br/>
                <input type="file" onChange={handleChange} className="pt-3"/>
                
                <a href="#" className="grey-btn mt-2" onClick={handleLogoUpload}>Upload</a>
                </div>
            </div>
            <div className="card img-upload mt-3">                   
                <div className="form-image-divs">
                </div>
                <div className="card-body">
                <h3 className="mt-0  card-title">Upload a banner</h3>
                <div className="upload-img-container">
                    <img src={sBannerUrl}  className="form-image"/>
                </div>
                <progress id="file" value={bannerProgress} max="100"></progress>
                <input type="file" onChange={handleChange} className="pt-3"/>
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

