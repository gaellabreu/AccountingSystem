import Account from 'models/Account';
import AuthenticatedUser from 'models/AuthenticatedUser';
import Company from 'models/Company';
import Currency from 'models/Currency';
import DocumentType from 'models/DocumentType';
import { SET_ACCOUNTS, SET_COMPANIES, SET_CURRENCIES, SET_DOCUMENT_TYPE } from './types';

interface GeneralProps {
    companies: Array<Company>,
    currencies: Array<Currency>,
    documentTypes: Array<DocumentType>,
    accounts: Array<Account>
}
const INITIAL_STATE: GeneralProps = {
    companies: Array<Company>(),
    currencies: Array<Currency>(),
    documentTypes: Array<DocumentType>(),
    accounts: Array<Account>()
};

export default (state: GeneralProps = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case SET_COMPANIES: {
            state.companies = action.payload
            return state
        }
        case SET_CURRENCIES: {
            state.currencies = action.payload
            return state
        }
        case SET_DOCUMENT_TYPE: {
            state.documentTypes = action.payload
            return state
        }
        case SET_ACCOUNTS: {
            state.accounts = action.payload
            return state
        }
        default: return state;
    }
};