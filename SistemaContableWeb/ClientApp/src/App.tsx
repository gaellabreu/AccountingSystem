import React, { useState } from 'react';
import { Route, useHistory } from 'react-router';
import './app.css'

import { Col, Layout, Menu, Row, Typography } from 'antd';
import {
    SettingOutlined,
    UserOutlined,
    BankOutlined,
    BranchesOutlined,
    DollarOutlined
} from '@ant-design/icons';
import Users from './components/settings/Users';
import Companies from './components/settings/Companies';
import Profiles from './components/settings/Profiles';
import Multicurrency from './components/settings/Multicurrency';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default () => {
    const [collapsed, setCollapsed] = useState(false)

    const history = useHistory()

    const toggleCollapse = () => setCollapsed(!collapsed)
    return <>
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapse}>
                <div style={{
                    height: '32px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    margin: '16px'
                }} />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <SubMenu key="sub1" title="Configuración">
                        <Menu.Item key="1" onClick={() => history.push('/users')}><UserOutlined translate />Usuarios</Menu.Item>
                        <Menu.Item key="2" onClick={() => history.push('/companies')}><BankOutlined translate />Empresas</Menu.Item>
                        <Menu.Item key="3" onClick={() => history.push('/profiles')}><BranchesOutlined translate />Perfiles</Menu.Item>
                        <Menu.Item key="4" onClick={() => history.push('/multicurrency')}><DollarOutlined translate />Multimoneda</Menu.Item>
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
                            <UserOutlined translate style={{ color: 'white' }} /><Typography.Text strong style={{ color: 'white' }}>usuario: gferreras</Typography.Text>
                        </Col>
                    </Row>

                </Header>
                <Content style={{ margin: '8px', overflowY: 'auto' }}>
                    <Route exact path={'/'}>
                        <Users />
                    </Route>
                    <Route path={'/users'}>
                        <Users />
                    </Route>
                    <Route path={'/companies'}>
                        <Companies />
                    </Route>
                    <Route path={'/profiles'}>
                        <Profiles />
                    </Route>
                    <Route path={'/multicurrency'}>
                        <Multicurrency />
                    </Route>
                </Content>
            </Layout>
        </Layout>

    </>
}