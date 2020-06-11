import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import swal from 'sweetalert';


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
            console.log(response)
            console.log(data)

            if (response.status === 200) {
                localStorage.setItem('email', data.local_storage_id);
                history.push('/restaurant-dashboard');
            } else {
                swal("Ooops", "Incorrect login details", "error");
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="page container restaurant-forms">
            <div className="login-bg bg"></div>
                <h1 className="card-header">Login</h1>
                <p>Don't have an account? <Link to="/restaurant-register">Register today</Link></p>
                 
                    <label className="form-label mb-0">Email address</label>
                        <input className="form-control mb-4" value={sEmail} onChange={(e) => setEmail(e.target.value)} id="loginEmail" placeholder="email" />
                        <label className="form-label mb-0">Password</label>
                        <input  className="form-control" value={sPassword} onChange={(e) => setPassword(e.target.value)} type="password" id="loginPassword" placeholder="password" /><br />
                        <input id="loginButton" type="submit" value="Login"  className="blue-button" onClick={login} /><br />
                        <small>Forgot your password?<Link to="/restaurant-password-request" >Reset password</Link></small>
  
        </div>
    );
}

export default Login;
if (document.getElementById('restaurantLogin')) {
    ReactDOM.render(<Login />, document.getElementById('restaurantLogin'));
}
