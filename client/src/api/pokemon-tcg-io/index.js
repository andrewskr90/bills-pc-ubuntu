import axios from 'axios'
import { PTCGIO_API } from '../../../../config'

const { baseURL } = PTCGIO_API

const PtcgioService = {
    getSets() {
        return axios.get(`${baseURL}/sets`)
    },  
    getCardsFromSet(setId) {
        return axios.get(`${baseURL}/cards?q=set.id:${setId}`)
    },
    getCardById(id) {
        return axios.get(`${baseURL}/cards?q=id:${id}`)
    }
}


export default PtcgioService
