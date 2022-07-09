import React from 'react'

const TrainerProfilePage = (props) => {
    const { userClaims } = props
    const { user_name, user_email, user_favorite_gen } = userClaims
    return (<div className='trainerProfilePage page flexColumn'>
        <h2>Profile</h2>
        <p>Trainer: {user_name}</p>
        <p>Email: {user_email}</p>
        <p>Favorite Gen: {user_favorite_gen}</p>
    </div>)
}

export default TrainerProfilePage
