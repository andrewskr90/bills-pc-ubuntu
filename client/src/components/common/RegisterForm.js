import React, { useState } from 'react'
import axios from 'axios'

const initialFormValues = {
    user_name: '',
    user_email: '',
    user_favorite_gen: '',
    user_password: '',
    repeat_user_password: ''

}

const RegisterForm = () => {
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
            url: '/api/v1/auth/register',
            method: 'post',
            baseURL: 'http://localhost:7070',
            data: formValues,
            withCredentials: true
        }
        axios(axiosOptions).then(res => {
                setErrorMessage('')
                console.log(res.data)
                // setResponse(res.message)
            }).catch(err => {
                console.log(err.response)
                setErrorMessage(err.response.data.message)
            })
    }

    return (<div className='registration'>
        <h2>Register</h2>
        <form onSubmit={submitForm}>
            <label>Trainer Name</label>
            <input
                name='user_name'
                type='string'
                value={formValues.user_name}
                onChange={handleChange}
            />
            <label>Email</label>
            <input
                name='user_email'
                type='string'
                value={formValues.user_email}
                onChange={handleChange}
            />
            <label>Favorite Gen</label>
            <input
                name='user_favorite_gen'
                type='string'
                value={formValues.user_favorite_gen}
                onChange={handleChange}
            />
            <label>Password</label>
            <input
                name='user_password'
                type='password'
                value={formValues.user_password}
                onChange={handleChange}
            />
            <label>Repeat Password</label>
            <input
                name='repeat_user_password'
                type='password'
                value={formValues.repeat_user_password}
                onChange={handleChange}
            />
            <button>Submit</button>
        </form>
        <p className='error'>{errorMessage}</p>
    </div>)
}

export default RegisterForm
