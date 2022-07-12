import React from 'react'
import LoginForm from '../features/authenticate/LoginForm'
import RegisterForm from '../features/authenticate/RegisterForm'

const Login = (props) => {
    const { setUserClaims } = props

    return (<div className='loginPage'>
        <LoginForm setUserClaims={setUserClaims} />
        <RegisterForm />
    </div>)
}

export default Login
