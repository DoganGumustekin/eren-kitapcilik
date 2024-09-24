import React, { useState } from 'react';
import constans from '../../utilities/constans';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css'

import user_icon from '../assets/person.png'
import email_icon from '../assets/email.png'
import password_icon from '../assets/password.png'
import { jwtDecode } from 'jwt-decode';
import { Alert,Snackbar } from '@mui/material';

function LoginSignup() {
    const navigate = useNavigate();

    const [action, setAction] = useState("Login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userRoles, setRoles] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');

    const handleClose = () => {
        setSnackbarOpen(false);
    };

    const fetchForLogin = async () => {
        const url = constans.API_URL_LOGIN_POST;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const responseData = await response.json();

        if (response.status !== 200) {
            console.log('Status: ', response.status);
            console.log('Data: ', responseData.Data);
            console.log('Success: ', responseData.Success);
            console.log('Message: ', responseData.Message);
            
            setSnackbarMessage(`Error: ${responseData.Message}`);
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        // const jwtToken = response.token;

        console.log('Token:', responseData.token);
        console.log('Expiration:', responseData.expiration);

        const decodedToken = jwtDecode(responseData.token);
        const role = decodedToken.roles;
        console.log('role: ' ,role);
        setRoles(role);

        if(role === "admin"){
            navigate('/adminhomepage');
        }else{
            navigate('/searchbook');
        }
    };


    const fetchForRegister = async () => {
        const url = constans.API_URL_REGISTER_POST;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstName, lastName, email, password })
        });
        const responseData = await response.json();
            
        if (response.status !== 200) {
            console.log('Status: ', response.status);
            console.log('Success: ', responseData.Success);
            console.log('Message: ', responseData.Message);
            return;
        }
        console.log('Token:', responseData.token);
        console.log('Expiration:', responseData.expiration);

        navigate('/userhomepage');
    };

    return (
        <div className='container'>
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action === "Login" ? <div></div> : <><div className="input">
                    <img src={user_icon} alt="" />
                    <input type="text" placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                <div className="input">
                <img src={user_icon} alt="" />
                <input type="text" placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                </div></>}
                <div className="input">
                    <img src={email_icon} alt="" />
                    <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>
            {action === "Sign Up" ? <div></div> : <div className="forgot-password">Lost Password <span>Click Here!</span></div>}
            <div className="submit-container">
                {action === "Login" ? (<button className="submit" onClick={fetchForLogin}>Login</button>) : (<div className="submit" onClick={fetchForRegister}>Sign Up</div>)}
                <div className="submit gray" onClick={() => setAction(action === "Login" ? "Sign Up" : "Login")}>{action === "Login" ? "Sign Up" : "Login"}</div>
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default LoginSignup;