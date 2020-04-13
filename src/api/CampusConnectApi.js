import axios from 'axios'

export default axios.create({
    baseURL: 'https://europe-west1-campusconnect-backend.cloudfunctions.net/api'
})