import axios from 'axios'
import { API } from '../Config'

export const authenticate = (data, next) => {
    if(data){
        if (typeof window != undefined) {
            localStorage.setItem('jwt', JSON.stringify(data))
        }
        next()
    }
}

export const isAuthenticated = () => {
    if (typeof window == undefined) {
        return false
    }
    else if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'))
    }
    else {
        return false
    }
}

export const signout = async () => {
    if(typeof window !== 'undefined') {
        localStorage.removeItem('jwt')
        await axios.get(`${API}/signout`)
        .then(res => console.log("Signout: " + res))
        .catch(err => console.log(err))
    }
}