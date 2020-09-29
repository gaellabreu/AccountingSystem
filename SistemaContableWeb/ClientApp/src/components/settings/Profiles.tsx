import { AutoComplete, Button, Card, Checkbox, Col, Dropdown, Input, Menu, Row, Select, Table, Typography } from 'antd'
import React, { useState } from 'react'
import {
    UserAddOutlined,
    UserOutlined,
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';

export default () => {

    const dataSource = [
        {
            key: '0',
            name: 'Usuario',
            edit: true,
            add: false,
            delete: true,
            view: true,
            list: true
        },
        {
            key: '1',
            name: 'Empresa',
            edit: true,
            add: true,
            delete: true,
            view: false,
            list: false
        },
        {
            key: '2',
            name: 'Perfiles',
            edit: false,
            add: true,
            delete: true,
            view: true,
            list: true
        },
    ];

    const columns = [
        {
            title: 'Formulario',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Editar',
            dataIndex: 'edit',
            key: 'edit',
            render: (value: any) => <Checkbox checked={value} />
        },
        {
            title: 'Agregar',
            dataIndex: 'add',
            key: 'add',
            render: (value: any) => <Checkbox checked={value} />
        },
        {
            title: 'Eliminar',
            dataIndex: 'delete',
            key: 'delete',
            render: (value: any) => <Checkbox checked={value} />
        },
        {
            title: 'Vista',
            dataIndex: 'view',
            key: 'view',
            render: (value: any) => <Checkbox checked={value} />
        },
        {
            title: 'Listado',
            dataIndex: 'list',
            key: 'list',
            render: (value: any) => <Checkbox checked={value} />
        },
    ];

    const overlay = () => <Menu>
        <Menu.Item icon={<EditOutlined translate />}>Editar</Menu.Item>
        <Menu.Item icon={<DeleteOutlined translate />}>Eliminar</Menu.Item>
    </Menu>

    const onSelect = (data: string) => {
        console.log('onSelect', data);
    };
    const onChange = (data: string) => {
        setValue(data);
    };
    const [value, setValue] = useState('');
    const [options, setOptions] = useState<{ value: string }[]>([]);
    const onSearch = (searchText: string) => {
        setOptions(
            !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
        );
    };

    const mockVal = (str: string, repeat: number = 1) => {
        return {
            value: str.repeat(repeat),
        };
    };

    return <>
        <Card style={{ marginBottom: '8px' }}>
            <Row justify={'space-between'}>
                <Row>
                    <Select style={{ width: 200 }}>
                        <Select.Option key={1} value={'Pan Pepín'}>{'Pan Pepín'}</Select.Option>
                        <Select.Option key={2} value={'Max Corredores de Seguros'}>{'Max Corredores de Seguros'}</Select.Option>
                        <Select.Option key={3} value={'Taramaca'}>{'Taramaca'}</Select.Option>
                    </Select>
                    <AutoComplete
                        options={options}
                        style={{ width: 200 }}
                        onSelect={onSelect}
                        onSearch={onSearch}
                        placeholder="Buscar por usuario"
                    />
                </Row>

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