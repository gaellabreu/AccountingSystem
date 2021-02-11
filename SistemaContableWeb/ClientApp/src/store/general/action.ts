import { AxiosResponse } from 'axios';
import { SET_COMPANIES, SET_DOCUMENT_TYPE, SET_CURRENCIES, SET_ACCOUNTS, SET_DEFAULT_CURRENCY } from './types'
import API, { handleError } from 'utils/API';
import { GET_ACCOUNTS_LIST, GET_COMPANIES, GET_CURRENCIES, GET_ORIGIN_DOCUMENTS, LIST_ASSIGNED_CURRENCY } from 'utils/Routes';

export const getCompanies = () => async (dispatch: any) => API.get(GET_COMPANIES)
    .then((response: AxiosResponse) => {
        dispatch({ type: SET_COMPANIES, payload: response.data })
    })
    .catch(handleError);

export const getCurrencies = () => async (dispatch: any) => API.get(GET_CURRENCIES)
    .then((response: AxiosResponse) => {
        dispatch({ type: SET_CURRENCIES, payload: response.data })
    })
    .catch(handleError);

export const getDocumentTypes = () => async (dispatch: any) => API.get(GET_ORIGIN_DOCUMENTS)
    .then((response: AxiosResponse) => {
        dispatch({ type: SET_DOCUMENT_TYPE, payload: response.data })
    })
    .catch(handleError);

export const getAccounts = () => async (dispatch: any) => API.get(GET_ACCOUNTS_LIST)
    .then((response: AxiosResponse) => {
        dispatch({ type: SET_ACCOUNTS, payload: response.data })
    })
    .catch(handleError);

export const getDefaultCurrency = () => async (dispatch: any) => API.get(LIST_ASSIGNED_CURRENCY)
    .then((response: AxiosResponse) => {
        console.log('default currency id: ', response.data.id)
        dispatch({ type: SET_DEFAULT_CURRENCY, payload: response.data.id })
    })
    .catch(handleError);