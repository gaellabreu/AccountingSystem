import { Modal, Form, Input, Select, Button, notification } from "antd";
import Company from "models/Company";
import User from "models/User";
import React, { useEffect, useState } from "react";
import API from "utils/API";

export default (props: any) => {
  const [companyForm] = Form.useForm();
  const [model, setModel] = useState<Company>(new Company());
  const [loading, setLoading] = useState(false);

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  useEffect(() => {
    companyForm.setFieldsValue(model);
  }, [model]);

  useEffect(() => {
    if (!props.data) return;

    setModel({ ...props.data });
  }, [props.data]);

  const changeModel = (e: any) =>
    setModel({ ...model, ...{ [e.target.name]: e.target.value } });

  const save = () => {
    setLoading(true);

    const endpoint = props.data.id ? "editcompany" : "addcompany";

    API.post(`setting/${endpoint}`, model)
      .then(() => {
        notification.success({
          message: "EMPRESA",
          description: "Empresa guardado correctamente.",
        });
        props.close();
      })
      .catch(() => {
        notification.success({
          message: "ERROR",
          description: "Ocurrió un error al crear el empresa.",
        });
      })
      .finally(() => setLoading(false));
  };

  const isEdit = !!props.data.id;

  return (
    <Modal
      visible={props.visible}
      onCancel={props.close}
      destroyOnClose={true}
      title={"Mantenimiento de empresa"}
      footer={[
        <Button loading={loading} type={"primary"} onClick={save}>
          {model.id ? "Editar" : "Guardar"}
        </Button>,
        <Button onClick={props.close}>Cancelar</Button>,
      ]}
    >
      <Form form={companyForm} {...layout}>
        <Form.Item label={"Nombre"} name={"nombre"}>
          <Input disabled={isEdit} name={"nombre"} onChange={changeModel} />
        </Form.Item>
        <Form.Item label={"Teléfono"} name={"telefono"}>
          <Input name={"telefono"} onChange={changeModel} />
        </Form.Item>
        <Form.Item label={"Celular"} name={"celular"}>
          <Input name={"celular"} onChange={changeModel} />
        </Form.Item>
        <Form.Item label={"Contacto"} name={"contacto"}>
          <Input name={"contacto"} onChange={changeModel} />
        </Form.Item>
        <Form.Item label={"RNC"} name={"rnc"}>
          <Input name={"rnc"} onChange={changeModel} />
        </Form.Item>
        <Form.Item label={"Dirección"} name={"direccion"}>
          <Input name={"direccion"} onChange={changeModel} />
        </Form.Item>
        <Form.Item label={"Ciudad"} name={"ciudad"}>
          <Input name={"ciudad"} onChange={changeModel} />
        </Form.Item>
        <Form.Item label={"Provincia"} name={"provincia"}>
          <Input name={"provincia"} onChange={changeModel} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
