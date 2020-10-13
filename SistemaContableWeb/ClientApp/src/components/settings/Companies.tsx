import {
  Button,
  Card,
  Col,
  Dropdown,
  Input,
  Menu,
  notification,
  Row,
  Table,
  Modal,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  UserAddOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import API from "utils/API";
import { AxiosError, AxiosResponse } from "axios";
import ManageCompany from "./modals/ManageCompany";
import Company from "models/Company";

const { confirm } = Modal;

export default () => {
  const [companies, setCompanies] = useState(new Array());
  const [data, setData] = useState<Company>(new Company());
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!show) getCompanies();
  }, [show]);

  const toggleModal = () => setShow(!show);

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
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Teléfono",
      dataIndex: "telefono",
      key: "telefono",
    },
    {
      title: "Celular",
      dataIndex: "celular",
      key: "celular",
    },
    {
      title: "Contacto",
      dataIndex: "Contact",
      key: "Contact",
    },
    {
      title: "RNC",
      dataIndex: "rnc",
      key: "rnc",
    },
  ];

  const getCompanies = () =>
    API.get("setting/listcompany")
      .then((response: AxiosResponse) => setCompanies([...response.data]))
      .catch((err: AxiosError) =>
        notification.error({
          message: "ERROR",
          description: "Ocurrió un error al obtener el listado de empresas",
        })
      );

  const editCompany = (record: Company) => {
    console.log(record);
    toggleModal();
    setData({ ...record });
  };

  const newCompany = () => {
    setData({ ...new Company() });
    toggleModal();
  };

  const deleteCompany = (id: number) =>
    confirm({
      title: "Eliminar Empresa",
      content: "¿Está seguro que desea eliminar esta empresa?",
      onOk: () =>
        API.post(`setting/DeleteCompany?id=${id}`)
          .then(() => {
            notification.success({
              message: "EMPRESA",
              description: "empresa eliminada correctamente.",
            });
         
          })
          .catch(() => {
            notification.success({
              message: "ERROR",
              description: "Ocurrió un error al eliminar el usuario.",
            });
          })
          .finally(() => getCompanies()),
    });

  const overlay = (record: any) => (
    <Menu>
      <Menu.Item
        icon={<EditOutlined translate />}
        onClick={() => editCompany(record)}
      >
        Editar
      </Menu.Item>
      <Menu.Item 
          icon={<DeleteOutlined translate />}
          onClick={() => deleteCompany(record.id)}
      >
          Eliminar</Menu.Item>
    </Menu>
  );

  return (
    <>
      <Card style={{ marginBottom: "8px" }}>
        <Row justify={"space-between"}>
          <Input
            suffix={<SearchOutlined translate />}
            placeholder={"Buscar empresa"}
            style={{ width: "200px" }}
          />
          <Button.Group>
            <Button
              type={"primary"}
              icon={<UserAddOutlined translate />}
              onClick={newCompany}
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
        <Table size={"small"} dataSource={companies} columns={columns} />
      </div>

      <ManageCompany visible={show} close={toggleModal} data={data} />
    </>
  );
};
