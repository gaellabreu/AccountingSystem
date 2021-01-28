import React, { useEffect, useState } from "react";
import API, { handleError, handleSuccess } from '../../utils/API'
import { GET_ACCOUNTS_LIST, DELETE_ACCOUNT, GET_CATEGORIES } from '../../utils/Routes'

import {
    Button,
    Card,
    Dropdown,
    Input,
    Menu,
    Row,
    Table,
    Modal
} from "antd";
import {
    OrderedListOutlined,
    SearchOutlined,
    EditTwoTone,
    DeleteTwoTone,
    FolderAddFilled
} from "@ant-design/icons";
import ManageAccounts from "./modals/ManageAccounts";
import { AxiosResponse } from "axios";
import Account from "models/Account";
import CategoryList from "./modals/CategoryList";
import Category from "models/Category";

export default () => {
    const [accounts, setAccounts] = useState(new Array());
    const [search, setSearch] = useState('');
    const [visible, setVisible] = useState(false);
    const [categoryVisible, setCategoryVisible] = useState(false)
    const [data, setData] = useState<Account>(new Account());
    const [categories, setCategories] = useState(new Array<Category>())

    useEffect(() => {
        if (!visible)
            getAccounts()
    }, [visible]);

    const toggleModal = () => setVisible(!visible);
    const toggleCategoryModal = () => setCategoryVisible(!categoryVisible);

    const onSearch = (e: any) => setSearch(e.target.value);

    const getAccounts = () => API.get(GET_ACCOUNTS_LIST)
        .then((response: AxiosResponse) => setAccounts([...response.data]))
        .catch(handleError)

    const deleteAccount = (account: Account) => Modal.confirm({
        content: '¿Desea eliminar esta cuenta?',
        onOk: () => API.post(DELETE_ACCOUNT, account)
            .then(handleSuccess)
            .catch(handleError)
            .finally(() => getAccounts())
    })

    const getCategories = () => API.get(GET_CATEGORIES)
        .then((response: AxiosResponse) => setCategories([...response.data]))
        .catch(handleError)

    const columns = [
        {
            title: "Id",
            dataIndex: "idcuenta",
            key: "idcuenta",
        },
        {
            title: "Cuenta",
            dataIndex: "cuenta",
            key: "cuenta",
        },
        {
            title: "Descripción",
            dataIndex: "descripcion",
            key: "descripcion",

        },
        {
            title: "Categoría",
            dataIndex: "idcategoria",
            key: "idcategoria",
        },
        {
            title: "Tipo de contabilización",
            dataIndex: "tipocontabilizacion",
            key: "tipocontabilizacion",
            render: (text: number) => {
                let value = ''
                switch (text) {
                    case 1: value = 'Balance general'
                        break;
                    case 2: value = 'Partida y ganancias'
                        break;
                    default: value = '-'
                        break;
                }

                return value
            }
        },
        {
            title: "Tipo saldo",
            dataIndex: "tiposaldo",
            key: "tiposaldo",
            render: (text: number) => {
                let value = ''
                switch (text) {
                    case 1: value = 'Débito'
                        break;
                    case 2: value = 'Crédito'
                        break;
                    default: value = '-'
                        break;
                }

                return value;
            }
        },
        {
            title: "Acciones",
            dataindex: "actions",
            key: "actions",
            render: (text: string, record: Account) => <Dropdown overlay={() => tableDropDownOptions(record)}>
                <Button type={'primary'}>Acciones</Button>
            </Dropdown>
        },
    ];

    const editAccount = (record: Account) => {
        setData({ ...record })
        toggleModal()
    }



    const tableDropDownOptions = (record: Account) => <Menu>
        <Menu.Item onClick={() => editAccount(record)}>
            <EditTwoTone twoToneColor={'#0000cc'} translate /> Editar
        </Menu.Item>
        <Menu.Item onClick={() => deleteAccount(record)}>
            <DeleteTwoTone twoToneColor={'#e50000'} translate /> Eliminar
        </Menu.Item>
    </Menu>

    return (
        <>
            <Card style={{ marginBottom: "8px" }}>
                <Row justify={"space-between"}>
                    <Input
                        value={search}
                        onChange={onSearch}
                        suffix={<SearchOutlined translate />}
                        placeholder={"Buscar cuenta"}
                        style={{ width: "200px" }}
                    />
                    <Button.Group>
                        <Button
                            type={"dashed"}
                            icon={<OrderedListOutlined translate />}
                            onClick={toggleCategoryModal}>Categorías</Button>
                        <Button
                            type={"primary"}
                            icon={<FolderAddFilled translate />}
                            onClick={toggleModal}>Agregar cuenta</Button>
                    </Button.Group>
                </Row>
            </Card>
            <div
                className="site-layout-background"
                style={{ padding: 12, minHeight: "50%", maxHeight: "50%" }}>
                <Table
                    size={"small"}
                    dataSource={accounts.filter(
                        (acc: any) =>
                            acc.cuenta?.toLowerCase().includes(search.toLowerCase()) ||
                            acc.descripcion?.toLowerCase().includes(search.toLowerCase())
                    )}
                    columns={columns}
                />
            </div>

            <ManageAccounts visible={visible} close={toggleModal} data={data} />
            <CategoryList visible={categoryVisible} close={toggleCategoryModal} />
        </>
    );
};
