import React, { useState } from 'react'
import axios from 'axios'

const initialFormValues = {
    user_name: '',
    user_password: ''

}

const Login = () => {
    const [formValues, setFormValues] = useState(initialFormValues)
    const [errorMessage, setErrorMessage] = useState('')

    const handleChange = (e) => {
        setErrorMessage('')
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = (e) => {
        e.preventDefault()
        const axiosOptions = {
            url: '/api/v1/auth/login',
            method: 'post',
            baseURL: 'http://localhost:7070',
            data: formValues,
            withCredentials: true
        }
        axios(axiosOptions).then(res => {
                console.log(res.data)
                setErrorMessage('')
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

export default Login
