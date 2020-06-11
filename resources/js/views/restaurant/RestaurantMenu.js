import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { storage } from './../../../firebase';
import swal from 'sweetalert';

const RestaurantMenu = () => {
    const dispatch = useDispatch();
    const restaurant = useSelector(state => state.restaurantsReducer.restaurant);
    const item_added = useSelector(state => state.restaurantsReducer.item_added);
    const item_deleted = useSelector(state => state.restaurantsReduceritem_deleted);
    // const menu = useSelector(state => state.restaurantsReducer.menu);
    // console.log(restaurant)
    console.log({ 'RESTAURANT': restaurant && restaurant.id })
    const [sTitle, setTitle] = useState('');
    const [sDescription, setDescription] = useState('');
    // const [sImage, setImage] = useState('');
    const [sPrice, setPrice] = useState('');
    const [sImageName, setImageName] = useState('');
    const [iMenuItemType, setMenuItemType] = useState('');
    const [aMenuItemOptions, setMenuItemOptions] = useState([]);
    const [aMenuItems, setMenuItems] = useState({
        starters: [],
        mains: [],
        desserts: [],
        snacks: [],
        beverages: []
    });
    const [iFile, setFile] = useState(null);
    const [sUrl, setUrl]= useState('');
    const [progress, setProgress ] = useState(0);

    //get menu item types for select
    useEffect(() => {
        axios.get(`/api/getMenuItemTypes`)
            .then(response => {
                setMenuItemOptions(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, []);

    //get menu
    useEffect(() => {
        if (restaurant) {
            console.log('restaurant')
            axios.get(`/api/getMenu/${restaurant.id}`)
                .then(response => {
                    console.log({"response":response})
                    console.log({ 1: response.data[0] })
                    setMenuItems({
                        starters: response.data[0].starter,
                        mains: response.data[0].main,
                        desserts: response.data[0].dessert,
                        beverages: response.data[0].beverage,
                        snacks: response.data[0].snack
                    });
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, [restaurant, item_added, item_deleted]);

    //delete menu item
    const deleteMenuItem = (e) => {
        e.preventDefault()
        // console.log(e.target.name)
        axios.delete(`/api/deleteMenuItem/${e.target.name}`, {
        })
            .then(response => {
                console.log(response);
                dispatch({ type: 'MENU_ITEM_DELETED', item_deleted: true });
                dispatch({ type: 'MENU_ITEM_DELETED', item_deleted: false });
            })
            .catch(error => {
                console.log(error);
            })
    }

    const save = async (e) => {
   
        e.preventDefault();
        try {
            if (restaurant && restaurant.id) {
                const result = await fetch(`/api/addMenuItem/${restaurant.id}`, {
                    method: 'post',
                    body: JSON.stringify({
                        title: sTitle,
                        description: sDescription,
                        image: sUrl,
                        price: sPrice,
                        menu_item_type_id: iMenuItemType,
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                const response = await result.json()
                console.log(response);
                //inform reducer about menu
                dispatch({ type: 'MENU_ITEM_CREATED', item_added: true });
                dispatch({ type: 'MENU_ITEM_DELETED', item_added: false });
            }
         
        } catch (error) {
            console.log(error)
        }
        setTitle('');
        setPrice('');
        setDescription('');
        setUrl('');
        setMenuItemType('');
    }

//image upload
    const handleChange = (e) => {
        if(e.target.files[0]) {
        let file = e.target.files[0]
        setImageName(file.name)
            let reader = new FileReader();
            if (file && file.type.match('image.*')) {
                reader.readAsDataURL(file);
            } 
            reader.onload = (e) => {
                // console.log(e.target.result)
                setFile(e.target.result)
          
            }
        }
    }
    console.log({9:iFile})
    const handleUpload = () => {
        console.log({9:iFile})
        const uploadTask = storage.ref(`/images/${sImageName}.jpg`).putString(iFile.substring(23), 'base64');
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress)
            },
            error => {
                console.log(error);
            },
          () =>   {
         storage
         .ref('images')
         .child(`${sImageName}.jpg`)
         .getDownloadURL()
         .then(url => {
            console.log(url)
            setUrl(url);
                swal({
                    text: "File uploaded",
                    icon: "success",
                    timer: 2000,
                    button: false
                })
         });
     });
    };
    return (
        <div className="container">
            <div className=" parent ">
                <div id="sidebar">        
                    <div className="menu-form">
                        <h3>Add menu items</h3>
                    <div>
                        <input value={sTitle} onChange={(e) => setTitle(e.target.value)} id="title" className="form-control" placeholder="title" /><br />
                        <div className="card img-upload mt-3 mb-3">                   
                            <div className="form-image-divs">
                            </div>
                            <div className="card-body">
                                <h4 className="mt-0  card-title">Upload an image</h4>
                            <div className="upload-img-container">
                                <img src={sUrl}  className="form-image"/>
                            </div>
                            <progress id="file" value={progress} max="100"></progress><br/>
                                <input type="file" onChange={handleChange} className="pt-3"/>
                                <a href="#" className="grey-btn mt-2" onClick={handleUpload}>Upload</a>
                            </div>
                        </div>
                





                        <input value={sPrice} onChange={(e) => setPrice(e.target.value)} id="price" className="form-control" placeholder="price" /><br />
                        <textarea value={sDescription} onChange={(event) => setDescription(event.target.value)} id="addDescription" name="addDescription" className="form-control" placeholder="description"></textarea><br />
                        <label htmlFor="menu_item_type_select">Select Course Type</label>
                        <select id="menu_item_type_select" value={iMenuItemType} onChange={(e) => setMenuItemType(e.target.value)} className="mb-5">
                        <option >Select a course</option>
                        {
                            aMenuItemOptions ? aMenuItemOptions.map(menuOption => (
                                <option key={menuOption.id} value={menuOption.id}>{menuOption.type}</option>
                            )) : null
                        }
                        {/* <option value="1">Starter</option> */}
                        </select>
            
                        <input id="registerButton" className="form-control" type="submit" value="Save" onClick={save} />
                    </div>
                </div>

    </div>
    <div id="main-content">
        <div className="menu-courses-container">
                    <h1 className="orange-text">MENU</h1>
                    <div className="menu-courses">
                <div className="menu-full-container overflow-auto">

         
                <div >
                    {aMenuItems.starters.length ? <h2>Starters</h2> : ''}
                    {
                        aMenuItems.starters ? aMenuItems.starters.map((starterItem, i) => (
                        <div key={i} className="card mb-3">
                            <div className="row">
                                <div className="col-md-4 m-0">
                                <img src={starterItem.image} className="card-img p-4" alt="menu_item" />
                                </div>
                                <div className="col-md-8">
                                <div className="card-body">
                                    <h4 className="card-title">{starterItem.title}</h4>
                                    <p className="card-text">{starterItem.description}</p>
                                    <p className="card-text">{starterItem.price}</p>
                                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                                    <input type="button" value="Delete" name={starterItem.id} onClick={(e) => deleteMenuItem(e)} />

                                </div>
                                </div>
                            </div>
                        </div>
                        )) : ''
                    }
                </div>
                <div>
                    {aMenuItems.mains.length ? <h2>Mains</h2> : ''}
                    {
                        aMenuItems.mains ? aMenuItems.mains.map((mainItem, i) => (
                            <div key={i} className="card mb-3">
                                <div className="row">
                                    <div className="col-md-4 m-0">
                                        <img src={mainItem.image} className="card-img p-4" alt="menu_item" />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h4 className="card-title">{mainItem.title}</h4>
                                            <p className="card-text">{mainItem.description}</p>
                                            <p className="card-text">{mainItem.price}</p>
                                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                                            <input type="button" value="Delete" name={mainItem.id} onClick={(e) => deleteMenuItem(e)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) : ''
                    }
                </div>
                <div>
                    
                    {aMenuItems.desserts.length ? <h1>Desserts</h1> : ''}
                    {
                        aMenuItems.desserts ? aMenuItems.desserts.map((dessertItem, i) => (
                            <div key={i} className="card mb-3">
                                <div className="row">
                                    <div className="col-md-4 m-0">
                                        <img src={dessertItem.image} className="card-img p-4" alt="menu_item" />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h4 className="card-title">{dessertItem.title}</h4>
                                            <p className="card-text">{dessertItem.description}</p>
                                            <p className="card-text">{dessertItem.price}</p>
                                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                                            <input type="button" value="Delete" name={dessertItem.id} onClick={(e) => deleteMenuItem(e)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) : ''
                    }
                </div>
                <div>
                    {aMenuItems.beverages.length ? <h1>Beverages</h1> : ''}
                    {
                        aMenuItems.beverages ? aMenuItems.beverages.map((beverageItem, i) => (
                        <div key={i} className="card mb-3">
                            <div className="row">
                                <div className="col-md-4 m-0">
                                    <img src={beverageItem.image} className="card-img p-4" alt="menu_item" />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h4 className="card-title">{beverageItem.title}</h4>
                                        <p className="card-text">{beverageItem.description}</p>
                                        <p className="card-text">{beverageItem.price}</p>
                                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                                        <input type="button" value="Delete" name={beverageItem.id} onClick={(e) => deleteMenuItem(e)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        )) : ''
                    }
                </div>
                <div>
                    {aMenuItems.snacks.length ? <h1>Sides</h1> : ''}
                    {
                        aMenuItems.snacks ? aMenuItems.snacks.map((sideItem, i) => (
                            <div key={i} className="card mb-3">
                            <div className="row">
                                <div className="col-md-4 m-0">
                                    <img src={sideItem.image} className="card-img p-4" alt="menu_item" />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h4 className="card-title">{sideItem.title}</h4>
                                        <p className="card-text">{sideItem.description}</p>
                                        <p className="card-text">{sideItem.price}</p>
                                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                                        <input type="button" value="Delete" name={sideItem.id} onClick={(e) => deleteMenuItem(e)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        )) : ''
                    }
                </div>
                </div>
                </div>
            </div>
        </div>
        </div>
        </div>
    


    );
}
export default RestaurantMenu;
if (document.getElementById('restaurantMenu')) {
    ReactDOM.render(<RestaurantMenu />, document.getElementById('restaurantMenu'));
}