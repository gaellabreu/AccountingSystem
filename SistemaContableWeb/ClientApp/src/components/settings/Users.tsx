import { Button, Card, Col, Dropdown, Input, Menu, notification, Row, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import {
    UserAddOutlined,
    SearchOutlined,
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import Axios, { AxiosError, AxiosResponse } from 'axios';
import API from '../../utils/API';
import Modal from 'antd/lib/modal/Modal';

export default (props:any) => {

    const [users, setUsers] = useState(new Array)
    const [search, setSearch] = useState('')
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        getUsers()
    }, [])

    const toggleModal = () => setVisible(!visible)

    const onSearch = (e:any) => setSearch(e.target.value)
    // const dataSource = [
    //     {
    //         key: '0',
    //         username: 'gabreu',
    //         name: 'Gael Leonel Abreu',
    //         email: 'gael@mail.com'
    //     },
    //     {
    //         key: '1',
    //         username: 'lmartinez',
    //         name: 'Luis Martinez',
    //         email: 'luis@mail.com'
    //     },
    //     {
    //         key: '2',
    //         username: 'ctapia',
    //         name: 'Carlos Tapia',
    //         email: 'carlos@mail.com'
    //     },
    // ];

    const columns = [
        {
            title: 'Acciones',
            dataindex: 'actions',
            key: 'actions',
            render: (field: any) => <Dropdown overlay={overlay()}>
                <Button type={'link'}>. . . .</Button>
            </Dropdown>
        },
        {
            title: 'Usuario',
            dataIndex: 'usuario',
            key: 'usurio',
        },
        {
            title: 'Rol',
            dataIndex: 'tipo',
            key: 'tipo',
        },
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
    ];

    const getUsers = () => {
        API.get('setting/listuser')
        .then((response:AxiosResponse) => setUsers([...response.data]))
        .catch((err:AxiosError) => notification.error({
            message: 'ERROR',
            description: ''
        }))
    }
    const overlay = () => <Menu>
        <Menu.Item icon={<EditOutlined translate />}>Editar</Menu.Item>
        <Menu.Item icon={<DeleteOutlined translate />}>Eliminar</Menu.Item>
    </Menu>

    return <>
        <Card style={{ marginBottom: '8px' }}>
            <Row justify={'space-between'}>
                <Input value={search} onChange={onSearch} suffix={<SearchOutlined translate />} placeholder={'Buscar usuario'} style={{ width: '200px' }} />
                <Button.Group>
                    <Button type={'primary'} icon={<UserAddOutlined translate />} onClick={toggleModal}>Agregar</Button>
                </Button.Group>
            </Row>

        </Card>
        <div className="site-layout-background" style={{ padding: 12, minHeight: '50%', maxHeight: '50%' }}>
            <Table size={'small'} dataSource={users.filter((user:any) => user.usuario.toLowerCase().includes(search.toLowerCase()) || user.nombre.toLowerCase().includes(search.toLowerCase()))} columns={columns} />
        </div>

        <Modal
        visible={visible}
        onCancel={toggleModal}>
            <Typography.Text>Carlos Tapia</Typography.Text>
        </Modal>
    </>
}

export class mycomp extends React.Component<any,any>{

    componentDidMount(){

    }

    componentDidUpdate(){

    }
}