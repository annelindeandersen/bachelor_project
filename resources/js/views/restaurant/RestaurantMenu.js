import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
    const [sImage, setImage] = useState('');
    const [sPrice, setPrice] = useState('');
    const [iMenuItemType, setMenuItemType] = useState('');
    const [aMenuItemOptions, setMenuItemOptions] = useState([]);
    const [aMenuItems, setMenuItems] = useState({
        starters: [],
        mains: [],
        desserts: [],
        snacks: [],
        beverages: []
    });
    //get menu item types for select
    useEffect(() => {
        axios.get(`/api/getMenuItemTypes`)
            .then(response => {
                setMenuItemOptions(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])
    //get menu
    useEffect(() => {
        if (restaurant) {
            console.log('restaurant')
            axios.get(`/api/getMenu/${restaurant.id}`)
                .then(response => {
                    console.log(response)
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
    }, [restaurant, item_added, item_deleted])

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
                        image: sImage,
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
            setTitle('');
            setPrice('');
            setDescription('');
            setImage('');
            setMenuItemType('');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container d-flex justify-content-center">
            <h1 className="card-header">Add menu items</h1>
            <div>
                <input value={sTitle} onChange={(e) => setTitle(e.target.value)} id="title" className="form-control" placeholder="title" /><br />
                <input value={sPrice} onChange={(e) => setPrice(e.target.value)} id="price" className="form-control" placeholder="price" /><br />
                <textarea value={sDescription} onChange={(event) => setDescription(event.target.value)} id="addDescription" name="addDescription" className="form-control" placeholder="description"></textarea><br />
                <input value={sImage} onChange={(e) => setImage(e.target.value)} id="image" className="form-control" placeholder="image" /><br />
                {/* <label htmlFor="img">Select image:</label>
            <input type="file" id="banner-image" name="image" accept="image/*" value={sImage} onChange={(e) => setImage(e.target.value)}/><br /> */}
                <label htmlFor="menu_item_type_select">Select Course Type</label>
                <select id="menu_item_type_select" value={iMenuItemType} onChange={(e) => setMenuItemType(e.target.value)}>
                    <option selected="selected">Select a course</option>
                    {
                        aMenuItemOptions ? aMenuItemOptions.map(menuOption => (
                            <option key={menuOption.id} value={menuOption.id}>{menuOption.type}</option>
                        )) : null
                    }
                    {/* <option value="1">Starter</option> */}
                </select>
                <meta name="csrf-token" content="{{ csrf_token() }}" />
                <input id="registerButton" className="form-control" type="submit" value="Save" onClick={save} />
            </div>
            <div>
                {aMenuItems.starters.length ? <h1>Starters</h1> : ''}
                {
                    aMenuItems.starters ? aMenuItems.starters.map((starterItem, i) => (
                        <div key={i}>
                            <p>{starterItem.title}</p>
                            <p>{starterItem.description}</p>
                            <p>{starterItem.price}</p>
                            <input type="button" value="Delete" name={starterItem.id} onClick={(e) => deleteMenuItem(e)} />
                        </div>
                    )) : ''
                }
            </div>
            <div>
                {aMenuItems.mains.length ? <h1>Mains</h1> : ''}
                {
                    aMenuItems.mains ? aMenuItems.mains.map((mainItem, i) => (
                        <div key={i}>
                            <p>{mainItem.title}</p>
                            <p>{mainItem.description}</p>
                            <p>{mainItem.price}</p>
                            <input type="button" value="Delete" name={mainItem.id} onClick={(e) => deleteMenuItem(e)} />
                        </div>
                    )) : ''
                }
            </div>
            <div>
                {aMenuItems.desserts.length ? <h1>Desserts</h1> : ''}
                {
                    aMenuItems.desserts ? aMenuItems.desserts.map((dessertItem, i) => (
                        <div key={i}>
                            <p>{dessertItem.title}</p>
                            <p>{dessertItem.description}</p>
                            <p>{dessertItem.price}</p>
                            <input type="button" value="Delete" name={dessertItem.id} onClick={(e) => deleteMenuItem(e)} />
                        </div>
                    )) : ''
                }
            </div>
            <div>
                {aMenuItems.beverages.length ? <h1>Beverages</h1> : ''}
                {
                    aMenuItems.beverages ? aMenuItems.beverages.map((beverageItem, i) => (
                        <div key={i}>
                            <p>{beverageItem.title}</p>
                            <p>{beverageItem.description}</p>
                            <p>{beverageItem.price}</p>
                        </div>
                    )) : ''
                }
            </div>
            <div>
                {aMenuItems.snacks.length ? <h1>Snacks</h1> : ''}
                {
                    aMenuItems.snacks ? aMenuItems.snacks.map((snackItem, i) => (
                        <div key={i}>
                            <p>{snackItem.title}</p>
                            <p>{snackItem.description}</p>
                            <p>{snackItem.price}</p>
                        </div>
                    )) : ''
                }
            </div>
        </div>
    );
}
export default RestaurantMenu;
if (document.getElementById('restaurantMenu')) {
    ReactDOM.render(<RestaurantMenu />, document.getElementById('restaurantMenu'));
}