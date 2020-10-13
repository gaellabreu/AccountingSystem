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

import Currency from "models/Currency";
import ManageCurrency from "./modals/ManageCurrency";
  
  const { confirm } = Modal;
  
  export default () => {
    const [currencys, setCurrency] = useState(new Array());
    const [data, setData] = useState<Currency>(new Currency());
    const [show, setShow] = useState(false);
  
    useEffect(() => {
      if (!show) getCurrency();
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
        title: "Id Moneda",
        dataIndex: "idMoneda",
        key: "idMoneda",
      },
      {
        title: "Descripcion",
        dataIndex: "descripcion",
        key: "descripcion",
      }
    ];
  
    const getCurrency = () =>
      API.get("setting/ListCurrency")
        .then((response: AxiosResponse) => setCurrency([...response.data]))
        .catch((err: AxiosError) =>
          notification.error({
            message: "ERROR",
            description: "Ocurrió un error al obtener el listado de monedas",
          })
        );
  
    const editCurrency = (record: Currency) => {
      console.log(record);
      toggleModal();
      setData({ ...record });
    };
  
    const newCurrency = () => {
      setData({ ...new Currency() });
      toggleModal();
    };
  
    const deleteCurrency = (id: number) =>
      confirm({
        title: "Eliminar moneda",
        content: "¿Está seguro que desea eliminar esta moneda?",
        onOk: () =>
          API.post(`setting/DeleteCurrency?id=${id}`)
            .then(() => {
              notification.success({
                message: "MONEDA",
                description: "moneda eliminada correctamente.",
              });
           
            })
            .catch(() => {
              notification.success({
                message: "ERROR",
                description: "Ocurrió un error al eliminar la moneda.",
              });
            })
            .finally(() => getCurrency()),
      });
  
    const overlay = (record: any) => (
      <Menu>
        <Menu.Item
          icon={<EditOutlined translate />}
          onClick={() => editCurrency(record)}
        >
          Editar
        </Menu.Item>
        <Menu.Item 
            icon={<DeleteOutlined translate />}
            onClick={() => deleteCurrency(record.id)}
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
              placeholder={"Buscar moneda"}
              style={{ width: "200px" }}
            />
            <Button.Group>
              <Button
                type={"primary"}
                icon={<UserAddOutlined translate />}
                onClick={newCurrency}
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
          <Table size={"small"} dataSource={currencys} columns={columns} />
        </div>
  
        <ManageCurrency visible={show} close={toggleModal} data={data} />
      </>
    );
  };
  