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
            name: 'Pan Pepín',
            rnc: '######',
            contact: 'Carlos Tapia'
        },
        {
            key: '1',
            name: 'Max Corredores de Seguros',
            rnc: '######',
            contact: 'Carlos Tapia'
        },
        {
            key: '2',
            name: 'Taramaca',
            rnc: '######',
            contact: 'Carlos Tapia'
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
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'RNC',
            dataIndex: 'rnc',
            key: 'rnc',
        },
        {
            title: 'Contacto',
            dataIndex: 'contact',
            key: 'contact',
        },
    ];

    const overlay = () => <Menu>
        <Menu.Item icon={<EditOutlined translate />}>Editar</Menu.Item>
        <Menu.Item icon={<DeleteOutlined translate />}>Eliminar</Menu.Item>
    </Menu>

    return <>
        <Card style={{ marginBottom: '8px' }}>
            <Row justify={'space-between'}>
                <Input suffix={<SearchOutlined translate />} placeholder={'Buscar empresa'} style={{ width: '200px' }} />
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