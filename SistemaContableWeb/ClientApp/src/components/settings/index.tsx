import React from 'react'
import { Route } from 'react-router'
import Companies from './Companies'
import Multicurrency from './Multicurrency'
import Profiles from './Profiles'
import Users from './Users'

export default () => <>
    <Route path={'/settings/users'}>
        <Users />
    </Route>
    <Route path={'/settings/companies'}>
        <Companies />
    </Route>
    <Route path={'/settings/profiles'}>
        <Profiles />
    </Route>
    <Route path={'/settings/multicurrency'}>
        <Multicurrency />
    </Route>
</>