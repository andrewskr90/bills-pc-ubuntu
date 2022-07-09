import React from 'react'

const PurchaseDetails = (props) => {
    const { purchaseFormValues, handlePurchaseFormChange } = props

    return (<div className='purchaseDetails'>
        <h3>Purchase Details</h3>
        <form className='flexColumnCenterStart'>
            <label>Purchase Date</label>
            <input
                type='date'
                placeholder='Purchase Date'
                value={purchaseFormValues.date}
                name='date'
                onChange={handlePurchaseFormChange}
            />
            <input 
                type='string'
                placeholder='Vendor Name'
                value={purchaseFormValues.vendor}
                name='vendor'
                onChange={handlePurchaseFormChange}
            />
        </form>
        <button className='button'>Continue</button>
    </div>)
}

export default PurchaseDetails
