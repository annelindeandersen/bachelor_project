import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Login = () => {
    // Redux
    // const logged_out = useSelector(state => state.restaurantsReducer.logged_out);
    // console.log(logged_out)
    const dispatch = useDispatch();
    // States
    const [sEmail, setEmail] = useState('');
    const [sPassword, setPassword] = useState('');
    // Current history
    let history = useHistory();

    // useEffect(() => {
    //     // set logout to true, so user can login again
    //     dispatch({ type: 'LOGOUT_USER', logged_out: true });
    // }, [])

    const login = async (e) => {
        try {
            e.preventDefault();
            const response = await fetch(`/api/auth/restaurantLogin`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: sEmail,
                    password: sPassword,
                })
            });
            const data = await response.json();
            console.log({'login-response':response})
            console.log({'login-data':data})

            if (response.status === 200) {
                localStorage.setItem('email', data.local_storage_id);
                // sessionStorage.setItem('email', data.session_data);
                dispatch({ type: 'LOGOUT_USER', logged_out: false });
                dispatch({ type: 'CURRENT_USER', restaurant: data.restaurant });
                history.push('/restaurant-dashboard');
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container d-flex justify-content-center">
            <h1 className="card-header">Login to dashboard</h1><br />
            <input value={sEmail} onChange={(e) => setEmail(e.target.value)} id="loginEmail" className="form-control" placeholder="email" /><br />
            <input value={sPassword} onChange={(e) => setPassword(e.target.value)} type="password" id="loginPassword" className="form-control" placeholder="password" /><br />
            <input id="loginButton" className="form-control" type="submit" value="Login" onClick={login} />
            <small>Forgot your password?<Link to="/restaurant-password-request">Reset password</Link></small>
        </div>
    );
}

export default Login;
if (document.getElementById('restaurantLogin')) {
    ReactDOM.render(<Login />, document.getElementById('restaurantLogin'));
}
