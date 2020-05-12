import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RestaurantMenu = () => {
    const dispatch = useDispatch();
    const [sTitle, setTitle] = useState('');
    const [sDescription, setDescription] = useState('');
    const [sImage, setImage] = useState('');
    const [sPrice, setPrice] = useState('');
    const [iMenuItemType, setMenuItemType] = useState('');
    const [aMenuItemOptions, setMenuItemOptions] = useState([]);
    const [aMenuItems, setMenuItems] = useState([]);

    //get menu item types for select options
    const getMenuOptions = async () => {
        const response = await fetch('/api/getMenuItemTypes');
        const data = await response.json();
        console.log(response);
        console.log(data);
        setMenuItemOptions(data)
    };

    useEffect(() => {
        getMenuOptions();
    }, [])

    console.log(aMenuItemOptions);
    const save = async (e) => {
        e.preventDefault();
        const result = await fetch('/api/addMenuItem/1', {
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
        const data = await result.json()
        console.log(data.data);
        setMenuItems([...aMenuItems, data.data]);
    }
    const getMenu = async (e) => {
        const response = await fetch('/api/getMenu/1');
        const data = await response.json();
        console.log(data)
        setMenuItems(data)
    }
    useEffect(() => {
        getMenu();
    }, [])
    return (
        <div className="container d-flex justify-content-center">
            <h1 className="card-header">Add restaurant details</h1>
            <div>
                <input value={sTitle} onChange={(e) => setTitle(e.target.value)} id="title" className="form-control" placeholder="title" /><br />
                <input value={sPrice} onChange={(e) => setPrice(e.target.value)} id="price" className="form-control" placeholder="price" /><br />
                <textarea value={sDescription} onChange={(event) => setDescription(event.target.value)} id="addDescription" name="addDescription" className="form-control" placeholder="description"></textarea><br />
                <input value={sImage} onChange={(e) => setImage(e.target.value)} id="image" className="form-control" placeholder="image" /><br />
                {/* <label htmlFor="img">Select image:</label>
            <input type="file" id="banner-image" name="image" accept="image/*" value={sImage} onChange={(e) => setImage(e.target.value)}/><br /> */}
                <label htmlFor="menu_item_type_select">Select Course Type</label>
                <select id="menu_item_type_select" value={iMenuItemType} onChange={(e) => setMenuItemType(e.target.value)}>
                    <option>Select a course</option>
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
                <div>
                    <h1>Starters</h1>
                    {
                        aMenuItems.filter((menuItem) => {
                            return menuItem.menu_item_type_id === 1;
                        }).map((menuItem) => (
                            <div key={menuItem.menu_item_type_id}>
                                <h2>{menuItem.title}</h2>
                                <p>{menuItem.description}</p>
                                <p>{menuItem.image}</p>
                                <p>{menuItem.price}</p>
                            </div>
                        ))
                    }
                </div>
                <div>
                    <h1>Main</h1>
                    {
                        aMenuItems.filter((menuItem) => {
                            return menuItem.menu_item_type_id === 2;
                        }).map((menuItem) => (
                            <div key={menuItem.id}>
                                <h2>{menuItem.title}</h2>
                                <p>{menuItem.description}</p>
                                <p>{menuItem.image}</p>
                                <p>{menuItem.price}</p>
                            </div>
                        ))
                    }
                </div>
                <div>
                </div>
            </div>
        </div>
    );
}
export default RestaurantMenu;
if (document.getElementById('restaurantMenu')) {
    ReactDOM.render(<RestaurantMenu />, document.getElementById('restaurantMenu'));
}