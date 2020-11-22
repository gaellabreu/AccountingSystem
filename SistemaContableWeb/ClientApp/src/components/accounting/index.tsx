import React from 'react'
import { Route } from 'react-router'
import Accounts from './Accounts'
import Legders from './Legders'

export default () => <>
    <Route path={'/accounting/accounts'} component={Accounts} />
    <Route path={'/accounting/ledgers'} component={Legders} />
</>