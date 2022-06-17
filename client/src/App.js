import React, { useState } from 'react'
import Registration from './components/trainer/Registration'
import Login from './components/shared/Login'
import './App.css'
import axios from 'axios'

const App = () => {
    const [verifyErrorMessage, setVerifyErrorMessage] = useState('')

    const verifyCookie = (e) => {
        const axiosOptions = {
            withCredentials: true,
            url: '/api/v1/auth',
            baseURL: 'http://localhost:7070'
        }
        axios(axiosOptions).then(res => {
            setVerifyErrorMessage('')
            console.log(res.data)
        }).catch(err => {
            console.log(err)
            setVerifyErrorMessage(err.response.data.message)
        })
    }
    return (<>
        <h1>Bill's PC</h1>
        <Registration />
        <div>
            <button onClick={verifyCookie}>Verify Cookie</button>
            <p className='error'>{verifyErrorMessage}</p>
        </div>
        <Login />
    </>)
}

export default App
