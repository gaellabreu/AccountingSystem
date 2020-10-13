import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Dropdown,
  Input,
  Menu,
  notification,
  Row,
  Table,
  Modal,
} from "antd";
import {
  UserAddOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { AxiosError, AxiosResponse } from "axios";
import API from "../../utils/API";
import ManageUser from "./modals/ManageUser";
import User from "models/User";

const { confirm } = Modal;

export default (props: any) => {
  const [users, setUsers] = useState(new Array());
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<User>(new User());

  useEffect(() => {
    getUsers();
  }, [visible]);

  const toggleModal = () => setVisible(!visible);

  const onSearch = (e: any) => setSearch(e.target.value);

  const columns = [
    {
      title: "Acciones",
      dataindex: "actions",
      key: "actions",
      render: (record: any) => (
        <Dropdown overlay={overlay(record)}>
          <Button type={"link"}>. . . .</Button>
        </Dropdown>
      ),
    },
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Usuario",
      dataIndex: "usuario",
      key: "usurio",
    },
    {
      title: "Rol",
      dataIndex: "tipo",
      key: "tipo",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  const getUsers = () => {
    API.get("setting/listuser")
      .then((response: AxiosResponse) => setUsers([...response.data]))
      .catch((err: AxiosError) =>
        notification.error({
          message: "ERROR",
          description: "",
        })
      );
  };

  const editUser = (record: User) => {
    toggleModal();
    setData({ ...record });
  };

  const addUser = () => {
    toggleModal();
    setData({ ...new User() });
  };

  const deleteUser = (id: number) =>
    confirm({
      title: "Eliminar usuario",
      content: "¿Está seguro que desea eliminar este usuario?",
      onOk: () =>
        API.post(`setting/deleteuser?id=${id}`)
          .then(() => {
            notification.success({
              message: "USUARIO",
              description: "Usuario eliminado correctamente.",
            });
           
          })
          .catch(() => {
            notification.success({
              message: "ERROR",
              description: "Ocurrió un error al eliminar el usuario.",
            });
          })
          .finally(() => getUsers()),
    });

  const overlay = (record: any) => (
    <Menu>
      <Menu.Item
        icon={<EditOutlined translate />}
        onClick={() => editUser(record)}
      >
        Editar
      </Menu.Item>
      <Menu.Item
        icon={<DeleteOutlined translate />}
        onClick={() => deleteUser(record.id)}
      >
        Eliminar
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Card style={{ marginBottom: "8px" }}>
        <Row justify={"space-between"}>
          <Input
            value={search}
            onChange={onSearch}
            suffix={<SearchOutlined translate />}
            placeholder={"Buscar usuario"}
            style={{ width: "200px" }}
          />
          <Button.Group>
            <Button
              type={"primary"}
              icon={<UserAddOutlined translate />}
              onClick={addUser}
            >
              Agregar
            </Button>
          </Button.Group>
        </Row>
      </Card>
      <div
        className="site-layout-background"
        style={{ padding: 12, minHeight: "50%", maxHeight: "50%" }}
      >
        <Table
          size={"small"}
          dataSource={users.filter(
            (user: any) =>
              user.usuario.toLowerCase().includes(search.toLowerCase()) ||
              user.nombre.toLowerCase().includes(search.toLowerCase())
          )}
          columns={columns}
        />
      </div>

      <ManageUser visible={visible} close={toggleModal} data={data} />
    </>
  );
};
