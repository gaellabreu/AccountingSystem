import { Badge, Button, Card, Col, Dropdown, Input, Menu, Row, Table, Typography } from 'antd'
import React, { useState } from 'react'
import {
    FileAddOutlined,
    SearchOutlined,
    EditOutlined,
    DeleteOutlined,
    DollarOutlined,
    SettingOutlined
} from '@ant-design/icons';
import CreateCurrency from './modals/CreateCurrency';
import AssignCurrency from './modals/AssignCurrency';
import CurrencyOption from './modals/CurrencyOption';

export default () => {

    const [showOptions, setShowOptions] = useState(false)
    const [showAssign, setShowAssign] = useState(false)
    const [showCreate, setShowCreate] = useState(false)

    const toggleOptions = () => setShowOptions(!showOptions)
    const toggleAssign = () => setShowAssign(!showAssign)
    const toggleCreate = () => setShowCreate(!showCreate)

    const dataSource = [
        {
            key: '0',
            currency: 'DOP',
            description: 'Peso Dominicano',
            status: true,
            company: 'Pan Pepín',
            date: '01/01/2020'
        },
        {
            key: '1',
            currency: 'USD',
            description: 'Dolar Estadounidense',
            status: false,
            company: 'Taramaca',
            date: '01/02/2020'
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
            title: '',
            dataIndex: 'status',
            key: 'status',
            render: (value: any) => <Badge status={value ? 'success' : 'error'} />
        },
        {
            title: 'Moneda',
            dataIndex: 'currency',
            key: 'currency',
        },
        {
            title: 'Descripción',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Empresa',
            dataIndex: 'company',
            key: 'company',
        },
        {
            title: 'Fecha',
            dataIndex: 'date',
            key: 'date',
        },
    ];

    const overlay = () => <Menu>
        <Menu.Item icon={<EditOutlined translate />}>Editar</Menu.Item>
        <Menu.Item icon={<DeleteOutlined translate />}>Eliminar</Menu.Item>
    </Menu>

    return <>
        <Card style={{ marginBottom: '8px' }}>
            <Row justify={'space-between'}>
                <Input suffix={<SearchOutlined translate />} placeholder={'Buscar moneda'} style={{ width: '200px' }} />
                <Button.Group>
                    <Button type={'primary'} icon={<FileAddOutlined translate />} onClick={toggleCreate}>Agregar</Button>
                    <Button type={'default'} icon={<SettingOutlined translate />} onClick={toggleOptions}>Opciones</Button>
                    <Button type={'default'} icon={<DollarOutlined translate />} onClick={toggleAssign}>Asignar moneda</Button>
                </Button.Group>
            </Row>

        </Card>
        <div className="site-layout-background" style={{ padding: 12, minHeight: '50%', maxHeight: '50%' }}>
            <Table size={'small'} dataSource={dataSource} columns={columns} />
        </div>

        <CurrencyOption visible={showOptions} close={toggleOptions} />
        <AssignCurrency visible={showAssign} close={toggleAssign} />
        <CreateCurrency visible={showCreate} close={toggleCreate} />
    </>
}