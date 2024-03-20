// LoginSignup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function LoginSignup() {
    const [action, setAction] = useState('Signup');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const nameInput = e.target.elements.name;
        const emailInput = e.target.elements.email;
        const passwordInput = e.target.elements.password;

        const name = nameInput ? nameInput.value : '';
        const email = emailInput ? emailInput.value : '';
        const password = passwordInput ? passwordInput.value : '';

        let userRecords = JSON.parse(localStorage.getItem('users')) || [];

        if (action === 'Signup') {
            if (userRecords.some(user => user.email === email)) {
                alert('User with this email already exists!');
            } else {
                userRecords.push({ name, email, password });
                localStorage.setItem('users', JSON.stringify(userRecords));
                alert('Registration successful!');
            }
        } else if (action === 'Login') {
            const foundUser = userRecords.find(user => user.email === email && user.password === password);
            if (foundUser) {
                alert(`Welcome back, ${foundUser.name}! Thanks for logging in.`);
                navigate('/fakestore');
            } else {
                alert('Invalid email or password!');
            }
        }
    };

    return (
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <form onSubmit={handleSubmit}>
                {action === 'Login' ? null : (
                    <div className="input">
                        <input type="text" name="name" placeholder="Enter name" />
                    </div>
                )}
                <div className="input">
                    <input type="email" name="email" placeholder="Email Id" />
                </div>
                <div className="input">
                    <input type="password" name="password" placeholder="Password" />
                </div>
                {action === 'Login' ? null : (
                    <div className="forget-password">
                        Forget password? <span>Click here!</span>
                    </div>
                )}
                <div className="submit-container">
                    <div
                        className={action === 'Login' ? 'submit gray' : 'submit'}
                        onClick={(e) => {
                            setAction('Signup');
                        }}
                    >
                        Signup
                    </div>
                    <div
                        className={action === 'Signup' ? 'submit gray' : 'submit'}
                        onClick={(e) => {
                            setAction('Login');
                        }}
                    >
                        Login
                    </div>
                </div>
                <button type="submit" className="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default LoginSignup;
