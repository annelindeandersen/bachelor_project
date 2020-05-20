import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './../../restaurant.css';






const Profile = () => {
    const [sDescription, setDescription] = useState('');
    const [iFile, setFile] = useState('');
    const [sImage, setImage] = useState('');
    const [sOpeningHour, setOpeningHour] = useState('');
    const [sClosingHour, setClosingHour] = useState('');
    const [sMessage, setMessage] = useState('');
    const [aCategories, setCategories] = useState([]);
    const [ aCheckedItems,  setCheckedItems] = useState({
        selected:[]
    });
    const [checked, setChecked] = useState(false)


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
    if(checked) {
        setCheckedItems({
            selected: [...aCheckedItems.selected, selectedCategory]
        })

    //    console.log(aCheckedItems)
    }  else{
        setCheckedItems({
            selected: aCheckedItems.selected.filter(selectedItem => selectedItem !== selectedCategory)
        })
    }
    // console.log(aCheckedItems)
}

    const onChange = (e) => {
        let file = e.target.files[0]
        let reader = new FileReader();
        if (file && file.type.match('image.*')) {
            reader.readAsDataURL(file);
        } 
        reader.onload = (e) => {
            // console.log(e.target.result)
            setFile(e.target.result)
        }
    }


    const formData = {      
        method: 'POST',
        url: '/api/createProfile/4',
        data: {
            description: sDescription,
            logo: iFile,
            opening_hour: sOpeningHour,
            closing_hour: sClosingHour,
            categories: aCheckedItems.selected
        },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    const save = (e) => {
        e.preventDefault();
        console.log(aCheckedItems.selected)
        axios(formData)
            .then(response => {
                console.log(response);
                // setDescription()
     
            }).catch((err) => {
                console.log(err);
            })
    }


    return (
        <div className="container d-flex justify-content-center">
            <h1 className="card-header">Create Profile</h1>
            <form onSubmit={save}>
                <textarea value={sDescription} onChange={(event) => setDescription(event.target.value)} name="description" id="addDescription" className="form-control" placeholder="description"></textarea><br />
                {/* <label htmlFor="img">Select image:</label>
                <input type="file" id="banner-image" name="image" accept="image/*" value={sImage} onChange={(e) => setImage(e.target.value)}/><br /> */}
                <label htmlFor="appt">Opeining time:</label>
                <input type="time" id="openingTime" name="opening_hour" min="09:00" max="18:00" required value={sOpeningHour} onChange={(event) => setOpeningHour(event.target.value)} />
                <label htmlFor="appt">Closing time:</label>
                <input type="time" id="openingTime" name="opening_hour" min="09:00" max="18:00" required value={sClosingHour} onChange={(event) => setClosingHour(event.target.value)} />
                <input type="file" accept="image/*"  name="logo" onChange={(e) => onChange(e)} name="logo" id="image" className="form-control" placeholder="image" /><br />
                
                { aCategories && aCategories.map((item, i)=> (
                 <label key={i}>
                 <input type="checkbox" 
                 value={item.id} 
                 name={item.category} 
                 onChange={(e) => handleSelect(e)}/>
                 <span className="check" ></span>
                 {item.category}
             </label>
                ))
             
                    
                }
             
                
                <meta name="csrf-token" content="{{ csrf_token() }}" />
                <input id="registerButton" className="form-control" type="submit" value="Save"/>
                </form>
            {sMessage ?
                <div>
                    <a href="">{sMessage}</a>
                </div> : ''
            }
        </div>
    );
}
export default Profile;
if (document.getElementById('createProfile')) {
    ReactDOM.render(<Profile />, document.getElementById('createProfile'));
}
