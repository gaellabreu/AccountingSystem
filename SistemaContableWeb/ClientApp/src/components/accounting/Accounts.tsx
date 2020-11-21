import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    Input,
    Row,
    Table,
    Modal,
} from "antd";
import {
    UserAddOutlined,
    SearchOutlined,
    EditOutlined,
    DeleteOutlined
} from "@ant-design/icons";
import User from "models/User";
import ManageAccounts from "./modals/ManageAccounts";

const { confirm } = Modal;

export default (props: any) => {
    const [accounts, setAccounts] = useState(new Array());
    const [search, setSearch] = useState('');
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState<User>(new User());

    useEffect(() => {
        //getaccounts
    }, []);

    const toggleModal = () => setVisible(!visible);

    const onSearch = (e: any) => setSearch(e.target.value);

    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Cuenta",
            dataIndex: "account",
            key: "account",
        },
        {
            title: "Descripción",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Categoría",
            dataIndex: "category",
            key: "category",
        },
        {
            title: "Tipo saldo",
            dataIndex: "type",
            key: "actions",
        },
        {
            title: "Acciones",
            dataindex: "actions",
            key: "actions",
            render: (record: any) => (
                <Button.Group>
                    <Button icon={<EditOutlined translate />} type={'primary'}>Editar</Button>
                    <Button icon={<DeleteOutlined translate />} type={'danger'}>Eliminar</Button>
                </Button.Group>
            ),
        },
    ];

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
                            type={"primary"}
                            icon={<UserAddOutlined translate />}
                            onClick={toggleModal}>Categoría</Button>
                        <Button
                            type={"primary"}
                            icon={<UserAddOutlined translate />}
                            onClick={toggleModal}>Agregar</Button>
                    </Button.Group>
                </Row>
            </Card>
            <div
                className="site-layout-background"
                style={{ padding: 12, minHeight: "50%", maxHeight: "50%" }}
            >
                <Table
                    size={"small"}
                    dataSource={accounts.filter(
                        (acc: any) =>
                            acc.account.toLowerCase().includes(search.toLowerCase()) ||
                            acc.description.toLowerCase().includes(search.toLowerCase())
                    )}
                    columns={columns}
                />
            </div>

            <ManageAccounts visible={visible} close={toggleModal} data={data} />
        </>
    );
};
