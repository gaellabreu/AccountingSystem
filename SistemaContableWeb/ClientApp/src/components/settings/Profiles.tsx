import { AutoComplete, Button, Card, Checkbox, Col, Dropdown, Input, Menu, notification, Row, Select, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import {
    SaveOutlined
} from '@ant-design/icons';
import { AxiosError, AxiosResponse } from 'axios';
import API from 'utils/API';

export default () => {

    const [companies, setCompanies] = useState(new Array)
    const [company, setCompany] = useState<number>()
    const [users, setUsers] = useState(new Array)
    const [user, setUser] = useState<any>()
    const [permissions, setPermissions] = useState(new Array)
    const [profiles, setProfiles] = useState(new Array)

    useEffect(() => {
        getCompanies()
        GetProfiles()
    }, [])

    const getCompanies = () =>
        API.get("setting/listcompany")
            .then((response: AxiosResponse) => {
                setCompanies([...response.data])
                onCompanySelect(response.data[0].id)
            })
            .catch(() =>
                notification.error({
                    message: "ERROR",
                    description: "Ocurrió un error al obtener el listado de empresas",
                })
            );

    const GetProfiles = () =>
        API.get("setting/getprofiles")
            .then((response: AxiosResponse) => setProfiles([...response.data]))
            .catch(() =>
                notification.error({
                    message: "ERROR",
                    description: "Ocurrió un error al obtener el listado de empresas",
                })
            );

    const getUsers = (e: any) => {
        API.get(`setting/searchusers?search=${e}`)
            .then((response: AxiosResponse) => setUsers([...response.data]))
            .catch(() =>
                notification.error({
                    message: "ERROR",
                    description: "",
                })
            );
    };

    const getPermissions = () => {
        if (!company && !user) {
            notification.warning({
                message: 'AVISO',
                description: 'Debe seleccionar una empresa y un usuario'
            })
        }

        API.get(`setting/getpermissions?empresa=${company}&usuario=${user}`)
            .then((response: AxiosResponse) => {
                var _permissions = response.data
                _permissions.map((p: any) => {
                    const name = profiles.find((r: any) => r.id == p.id).form
                    console.log('name', name)
                    Object.assign(p, { nombre: name })
                    return p
                })
                setPermissions([..._permissions])
            })
            .catch(() => notification.error({
                message: "ERROR",
                description: "",
            }))
    }

    const onCompanySelect = (value: any) => setCompany(value)

    const changePermission = (record: any, name: any) => {
        var idx = permissions.findIndex(x => x.id == record.id)
        permissions[idx][name] = !permissions[idx][name]
        setPermissions([...permissions])
    }

    const savePermissions = () => API.post('setting/editPermissions', permissions)
        .then(() => {
            notification.success({
                message: 'Permisos',
                description: 'Permisos guardados satisfactoriamente.'
            })
            getPermissions()
        })
        .catch(() => notification.error({
            message: "ERROR",
            description: "",
        }))

    const columns = [
        {
            title: 'Id',
            dataIndex: 'idPerfiles',
            key: 'idPerfiles',
        },
        {
            title: 'Formulario',
            dataIndex: 'nombre',
            key: 'nombre',
        },
        {
            title: 'Editar',
            dataIndex: 'editar',
            key: 'editar',
            render: (value: any, record: any) => <Checkbox checked={value} onChange={() => changePermission(record, 'editar')} />
        },
        {
            title: 'Agregar',
            dataIndex: 'agregar',
            key: 'agregar',
            render: (value: any, record: any) => <Checkbox checked={value} onChange={() => changePermission(record, 'agregar')} />
        },
        {
            title: 'Eliminar',
            dataIndex: 'eliminar',
            key: 'eliminar',
            render: (value: any, record: any) => <Checkbox checked={value} onChange={() => changePermission(record, 'eliminar')} />
        },
        {
            title: 'Vista',
            dataIndex: 'vista',
            key: 'vista',
            render: (value: any, record: any) => <Checkbox checked={value} onChange={() => changePermission(record, 'vista')} />
        },
        {
            title: 'Listado',
            dataIndex: 'listado',
            key: 'listado',
            render: (value: any, record: any) => <Checkbox checked={value} onChange={() => changePermission(record, 'listado')} />
        },
    ];

    const onSelect = (value: string, { id }: any) => setUser(id)

    return <>
        <Card style={{ marginBottom: '8px' }}>
            <Row justify={'space-between'}>
                <Row>
                    <Select value={company} style={{ width: 200 }} onSelect={onCompanySelect}>
                        {companies.map((c: any) => <Select.Option key={c.id} value={c.id}>{c.nombre}</Select.Option>)}
                    </Select>
                    <AutoComplete
                        options={users}
                        style={{ width: 200 }}
                        onSelect={onSelect}
                        onSearch={getUsers}
                        placeholder="Buscar por usuario"
                    />
                    <Button onClick={getPermissions}>Buscar</Button>
                </Row>

                <Button.Group>
                    <Button type={'primary'} icon={<SaveOutlined translate />} onClick={savePermissions}>Guardar</Button>
                </Button.Group>
            </Row>

        </Card>
        <div className="site-layout-background" style={{ padding: 12, minHeight: '50%', maxHeight: '50%' }}>
            <Table size={'small'} dataSource={permissions} columns={columns} />
        </div>
    </>
}