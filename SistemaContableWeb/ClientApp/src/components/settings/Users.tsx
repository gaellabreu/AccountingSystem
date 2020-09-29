import { Button, Card, Col, Dropdown, Input, Menu, Row, Table, Typography } from 'antd'
import React from 'react'
import {
    UserAddOutlined,
    SearchOutlined,
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';

export default () => {

    const dataSource = [
        {
            key: '0',
            username: 'gabreu',
            name: 'Gael Leonel Abreu',
            email: 'gael@mail.com'
        },
        {
            key: '1',
            username: 'lmartinez',
            name: 'Luis Martinez',
            email: 'luis@mail.com'
        },
        {
            key: '2',
            username: 'ctapia',
            name: 'Carlos Tapia',
            email: 'carlos@mail.com'
        },
    ];

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
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
    ];

    const overlay = () => <Menu>
        <Menu.Item icon={<EditOutlined translate />}>Editar</Menu.Item>
        <Menu.Item icon={<DeleteOutlined translate />}>Eliminar</Menu.Item>
    </Menu>

    return <>
        <Card style={{ marginBottom: '8px' }}>
            <Row justify={'space-between'}>
                <Input suffix={<SearchOutlined translate />} placeholder={'Buscar usuario'} style={{ width: '200px' }} />
                <Button.Group>
                    <Button type={'primary'} icon={<UserAddOutlined translate />}>Agregar</Button>
                </Button.Group>
            </Row>

        </Card>
        <div className="site-layout-background" style={{ padding: 12, minHeight: '50%', maxHeight: '50%' }}>
            <Table size={'small'} dataSource={dataSource} columns={columns} />
        </div>
    </>
}