import React from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const LoginPage = (props) => {
    const { setUserClaims } = props

    return (<div className='loginPage'>
        <header>
            <h1>Kyle's PC</h1>
        </header>
        <LoginForm setUserClaims={setUserClaims} />
        <RegisterForm />
    </div>)
}

export default LoginPage
