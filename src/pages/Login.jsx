import React from 'react'
import Header from '../components/header/Header'
import LoginComponent from '../components/loginComponent/LoginComponent'

const Login = () => {
    return (
        <div>
            <Header />
            <div className='wrapper'>
                <LoginComponent />
            </div>
        </div>
    )
}

export default Login