import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BillsPcService from '../../api/bills-pc'

const initialFormValues = {
    user_name: '',
    user_password: ''

}


const LoginForm = (props) => {
    const [formValues, setFormValues] = useState(initialFormValues)
    const [errorMessage, setErrorMessage] = useState('')
    const { setUserClaims } = props

    const navigate = useNavigate()

    const handleChange = (e) => {
        setErrorMessage('')
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = (e) => {
        e.preventDefault()
        BillsPcService.login(formValues)
            .then(res => {
                setErrorMessage('')
                setUserClaims(res.data)
                navigate('/')
            }).catch(err => {
                console.log(err.response)
                setErrorMessage(err.response.data.message)
            })
    }

    return (<div className='registration'>
        <h2>Login</h2>
        <form onSubmit={submitForm}>
            <label>Trainer Name</label>
            <input
                name='user_name'
                type='string'
                value={formValues.user_name}
                onChange={handleChange}
            />
            <label>Password</label>
            <input
                name='user_password'
                type='password'
                value={formValues.user_password}
                onChange={handleChange}
            />
            <button>Submit</button>
        </form>
        <p className='error'>{errorMessage}</p>
    </div>)
}

export default LoginForm
