import Axios from 'axios'

export default Axios.create({
    baseURL: 'https://localhost:44339/api/',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'pragma': 'no-cache',
        'cache-control': 'no-cache'
    }
})