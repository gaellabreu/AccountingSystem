import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    Input,
    Row,
    Table,
    Modal,
    DatePicker,
    Select,
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
            title: "Entrada",
            dataIndex: "entry",
            key: "entry",
        },
        {
            title: "Document de origen",
            dataIndex: "origin",
            key: "origin",
        },
        {
            title: "Descripción",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Estado",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Fecha",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Acciones",
            dataindex: "actions",
            key: "actions",
            render: (record: any) => (
                <Button.Group>
                    <Button icon={<EditOutlined translate />} type={'primary'}>Acción 1</Button>
                    <Button icon={<DeleteOutlined translate />} type={'danger'}>Acción 2</Button>
                </Button.Group>
            ),
        },
    ];

    return (
        <>
            <Card style={{ marginBottom: "8px" }}>
                <Row justify={"space-between"}>
                    <div>
                        Número de entrada <br />
                        <Input
                            value={search}
                            onChange={onSearch}
                            suffix={<SearchOutlined translate />}
                            placeholder={"Número de entrada"}
                            style={{ width: "200px" }}
                        />
                    </div>
                    <div>
                        Desde <br />
                        <DatePicker />
                    </div>
                    <div>
                        Hasta <br />
                        <DatePicker />
                    </div>
                    <div>
                        Documento de origen <br />
                        <Input
                            value={search}
                            onChange={onSearch}
                            suffix={<SearchOutlined translate />}
                            placeholder={"Número de entrada"}
                            style={{ width: "200px" }}
                        />
                    </div>
                    <div>
                        Estado <br />
                        <Select defaultValue={1}>
                            <Select.Option value={1}>Estado 1</Select.Option>
                            <Select.Option value={2}>Estado 2</Select.Option>
                            <Select.Option value={3}>Estado 3</Select.Option>
                        </Select>
                    </div>
                    <Button.Group>
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
