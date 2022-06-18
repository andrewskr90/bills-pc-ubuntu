import axios from 'axios'
import { PTCGIO_API } from '../../../../config'

const { baseURL } = PTCGIO_API

const getSets = async () => {
    return axios.get(`${baseURL}/sets`)
}

const getCardsFromSet = async (setId) => {
    return axios.get(`${baseURL}/cards?q=set.id:${setId}`)
}

export { getSets, getCardsFromSet }
