import React, { useEffect, useState } from 'react';
import { Route, useHistory, useRouteMatch } from 'react-router';
import { useSelector, useDispatch } from 'react-redux'

import { Col, Layout, Menu, Row, Typography } from 'antd';
import {
    UserOutlined,
    BankOutlined,
    BranchesOutlined,
    DollarOutlined,
    PoweroffOutlined,
    BookOutlined
} from '@ant-design/icons';

import './app.css'

import Settings from './components/settings'
import Login from './components/login/'
import API, { handleError } from 'utils/API';
import { AxiosError } from 'axios';
import Accounts from 'components/accounting';
import { getAccounts, getCompanies, getCurrencies, getDocumentTypes } from 'store/general/action';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

export default () => {
    const [collapsed, setCollapsed] = useState(false)

    const { user } = useSelector((state: any) => state)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        user.username ? history.push('/setting') : history.push('/')

        user.username && initGeneralData()
    }, [user])


    const initGeneralData = () => {
        dispatch(getCompanies())
        dispatch(getCurrencies())
        dispatch(getDocumentTypes())
        dispatch(getAccounts())
    }

    // useEffect(() => {
    //     user.username ? history.push('/setting') : history.push('/')
    // }, [])


    useEffect(() => {
        // isLogged()
    }, [])

    let isLogin = useRouteMatch("/");

    const toggleCollapse = () => setCollapsed(!collapsed)

    const logout = () => API.post('setting/logout')
        .then(() => history.push('/'))
        .catch(handleError)

    // const isLogged = () => API.get('setting/checklogin')
    //     .then(() => history.push('/setting'))
    //     .catch((err: AxiosError) => {
    //         err.request?.status == 401 && history.push('/')
    //     })

    return isLogin?.isExact ? <Route exact path={'/'}> <Login /> </Route> : <>
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapse}>
                <div style={{
                    height: '32px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    margin: '16px'
                }} />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <SubMenu key="subSetting" title="Configuración">
                        <Menu.Item key={1} onClick={() => history.push('/settings/users')}><UserOutlined translate={"true"} />Usuarios</Menu.Item>
                        <Menu.Item key={2} onClick={() => history.push('/settings/companies')}><BankOutlined translate />Empresas</Menu.Item>
                        <Menu.Item key={3} onClick={() => history.push('/settings/profiles')}><BranchesOutlined translate />Perfiles</Menu.Item>
                        <Menu.Item key={4} onClick={() => history.push('/settings/multicurrency')}><DollarOutlined translate />Multimoneda</Menu.Item>
                    </SubMenu>
                    <SubMenu key="subAccounting" title="Contabilidad">
                        <Menu.Item key={11} onClick={() => history.push('/accounting/accounts')}><BookOutlined translate />Cuentas</Menu.Item>
                        <Menu.Item key={12} onClick={() => history.push('/accounting/ledgers')}><BookOutlined translate />Diario</Menu.Item>
                    </SubMenu>
                    <SubMenu key="subUser" title="Usuario">
                        <Menu.Item key={99} onClick={logout}><PoweroffOutlined translate />Cerrar sesión</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header style={{ padding: 0 }} color={'primary'}>
                    <Row justify={'space-between'} style={{ margin: '0px 16px' }}>
                        <Col>
                            <Typography.Text strong style={{ color: 'white' }}>-</Typography.Text>
                        </Col>
                        <Col>
                            <Typography.Text strong style={{ color: 'white' }}>{user.username} - {user.companyName}</Typography.Text>
                        </Col>
                    </Row>

                </Header>
                <Content style={{ margin: '8px', overflowY: 'auto' }}>
                    <Settings />
                    <Accounts />
                </Content>
            </Layout>
        </Layout>

    </>
}