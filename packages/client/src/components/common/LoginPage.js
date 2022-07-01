import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const LoginPage = (props) => {
    const { setUserClaims, userClaims } = props
    const navigate = useNavigate()
    useEffect(() => {
        if (userClaims) {
            navigate('/')
        }
    }, [])

    return (<>
        {userClaims
        ?
        <></>
        :
        <div className='loginPage'>
        <h1>Bill's PC</h1>
        <LoginForm setUserClaims={setUserClaims} />
        <RegisterForm />
        </div>
        }
    </>)
}

export default LoginPage
