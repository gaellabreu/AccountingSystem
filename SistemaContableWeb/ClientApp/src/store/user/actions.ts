import { AxiosResponse } from 'axios';
import API from 'utils/API';
import { SET_USER_DATA, REMOVE_USER_DATA } from './types'

export const login = () => async (dispatch:any) => {
    API.get(`setting/login`)
        .then((response:AxiosResponse) => {
            dispatch({ type: SET_USER_DATA, payload: response.data })
        })
        .catch((err) => console.log(err))
};