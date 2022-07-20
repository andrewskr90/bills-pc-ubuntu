import React from 'react'

const CollectedCard = (props) => {
    const { collectedCard } = props

    return (
        <img src={collectedCard.card_image_small} />
    )
}

export default CollectedCard
