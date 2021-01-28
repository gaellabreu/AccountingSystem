import { AxiosResponse } from 'axios';
import { SET_USER_DATA } from './types'
import API, { handleError } from 'utils/API';
import LoginModel from '../../models/Login'
import AuthenticatedUser from 'models/AuthenticatedUser';

export const userLogin = (model: LoginModel) => async (dispatch: any) => API.post(`setting/login`, model)
    .then((response: AxiosResponse) => {
        dispatch({ type: SET_USER_DATA, payload: new AuthenticatedUser(response.data) })
    })
    .catch(handleError);