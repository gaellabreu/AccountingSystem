import { Button, Card, Form, Input, notification, Select } from 'antd';
import { userLogin } from '../../store/user/actions'
import loginbackground from 'assets/images/loginbackground.jpg'
import React, { useEffect, useState } from 'react'
import {
    UserOutlined,
    LockOutlined,
    LoginOutlined
} from '@ant-design/icons';
import LoginModel from 'models/Login';
import API from 'utils/API';
import { AxiosError, AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';

export default () => {
    const [login, changeLogin] = useState(new LoginModel)
    const [loading, changeLoading] = useState(false)
    const [companies, setCompanies] = useState(new Array)

    const [loginform] = Form.useForm()

    const dispatch = useDispatch()

    useEffect(() => {
        getCompanies()
    }, [])

    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 17 },
    };

    const tailLayout = {
        wrapperCol: { offset: 9, span: 16 },
    };

    const changeModel = (e: any) => {
        const { name, value } = e.target
        changeLogin({ ...login, ...{ [name]: value } })
    }

    const changeCompany = (e: number) => changeLogin({ ...login, ...{ company: e } })

    const submitLogin = () => {
        changeLoading(true)
        dispatch(userLogin(login))
    }

    const getCompanies = () =>
        API.get("setting/listcompany")
            .then((response: AxiosResponse) => setCompanies([...response.data]))
            .catch((err: AxiosError) =>
                notification.error({
                    message: "ERROR",
                    description: err.message,
                })
            );

    return <div style={{ height: '100vh', backgroundImage: `url(${loginbackground})` }}>
        <Card
            style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                marginTop: '-200px',
                marginLeft: '-250px',
                width: '500px',
                boxShadow: '2px 3px 10px grey',
                borderRadius: '10px'
            }}
            bordered={false}
            title={'Inicio de sesión'}>
            <Form
                form={loginform}
                {...layout}
                name={'login'}>
                <Form.Item
                    label={'Usuario'}
                    name={'username'}
                    rules={[{ required: true, message: 'Debe ingresar un nombre de usuario' }]}>
                    <Input
                        name={'username'}
                        value={login.username}
                        prefix={<UserOutlined translate />}
                        onChange={changeModel} />
                </Form.Item>

                <Form.Item
                    label={'Contraseña'}
                    name={'password'}
                    rules={[{ required: true, message: 'Debe ingresar su contraseña' }]}>
                    <Input.Password
                        name={'password'}
                        value={login.password}
                        prefix={<LockOutlined translate />}
                        onChange={changeModel} />
                </Form.Item>

                <Form.Item
                    label={'Compañía'}
                    name={'company'}
                    rules={[{ required: true, message: 'Debe seleccionar una contraseña' }]}>
                    <Select value={login.company} onSelect={changeCompany}>
                        {companies.map((c: any) => <Select.Option key={c.id} value={c.id}>{c.nombre}</Select.Option>)}
                    </Select>
                </Form.Item>

                <Form.Item
                    {...tailLayout}
                    name={'forgot'}>
                    <Button
                        loading={loading}
                        icon={<LoginOutlined translate />}
                        onClick={submitLogin}>Ingresar al sistema</Button>
                </Form.Item>
            </Form>
        </Card>
    </div>
}