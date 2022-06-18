import React from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const LoginPage = (props) => {
    const { setUserClaims } = props

    return (<div className='loginPage'>
        <h1>Bill's PC</h1>
        <LoginForm setUserClaims={setUserClaims} />
        <RegisterForm />
    </div>)
}

export default LoginPage
