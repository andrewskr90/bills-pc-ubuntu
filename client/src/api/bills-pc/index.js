import axios from 'axios'
import { BILLS_PC_API } from '../../../../config'

const { options } = BILLS_PC_API

const BillsPcService = {
    login(formValues) {
        return axios({
            ...options,
            url: '/api/v1/auth/login',
            method: 'post',
            data: formValues,
        })
    },
    findSetByPtcgioId(id) {
        return axios.get(`${baseURL}/sets/ptcgio/${id}`)
    },
    postSetsToSets(setsArray) {
        return axios.post(`${baseURL}/sets`, setsArray)
    },
    postCardsToCards(cardsArray) {
        console.log('post cards', cardsArray)
        return axios.post(`${baseURL}/cards`, cardsArray)
    },
    authenticateSession() {
        return axios({
            ...options,
            url: 'api/v1/auth',
            method: 'post'
        })
    }
}

export default BillsPcService
