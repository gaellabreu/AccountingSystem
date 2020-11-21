import Axios, { AxiosError } from 'axios'
import { notification } from 'antd'

export default Axios.create({
    baseURL: 'https://localhost:44339/api/',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'pragma': 'no-cache',
        'cache-control': 'no-cache'
    }
})

export const handleError = (err: AxiosError) => {
    var message = '';
    switch (err.request?.status) {
        case 401: message = "No está autorizado para realizar esta acción" 
            break;
        default: message = err.request?.responseText
            break;
    }

    return notification.error({ message })
}