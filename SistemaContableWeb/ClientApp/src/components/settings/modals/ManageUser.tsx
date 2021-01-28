import { Modal, Form, Input, Select, Button, notification } from "antd";
import { AxiosResponse } from "axios";
import User from "models/User";
import React, { useEffect, useState } from "react";
import API, { handleError } from "utils/API";

export default (props: any) => {
  const [userForm] = Form.useForm();
  const [model, setModel] = useState<User>(new User());
  const [roles, setRoles] = useState(new Array)
  const [loading, setLoading] = useState(false);

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  useEffect(() => {
    userForm.setFieldsValue(model);
  }, [model]);

  useEffect(() => {
    if (!props.data) return;

    setModel({ ...props.data });
  }, [props.data]);

  useEffect(() => {
    getRoles()
  }, [])

  const changeModel = (e: any) =>
    setModel({ ...model, ...{ [e.target.name]: e.target.value } });
  const typeSelect = (value: number) =>
    setModel({ ...model, ...{ tipo: value } });

  const getRoles = () => API.get('setting/getroles')
    .then((response: AxiosResponse) => setRoles([...response.data]))
    .catch(handleError)

  const save = () => {
    setLoading(true);

    const data = {
      id: model.id,
      usuario: model.usuario,
      email: model.email,
      nombre: model.nombre,
      tipo: model.tipo,
      pass: model.pass,
    };

    const endpoint = props.data.id ? "edituser" : "adduser";

    API.post(`setting/${endpoint}`, data)
      .then(() => {
        notification.success({
          message: "USUARIO",
          description: "Usuario guardado correctamente.",
        });
        props.close();
      })
      .catch(() => {
        notification.success({
          message: "ERROR",
          description: "Ocurrió un error al crear el usuario.",
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
      title={"Mantenimiento de usuario"}
      footer={[
        <Button loading={loading} type={"primary"} onClick={save}>
          {model.id ? "Editar" : "Guardar"}
        </Button>,
        <Button onClick={props.close}>Cancelar</Button>,
      ]}
    >
      <Form form={userForm} {...layout}>
        <Form.Item label={"Usuario"} name={"usuario"}>
          <Input disabled={isEdit} name={"usuario"} onChange={changeModel} />
        </Form.Item>
        <Form.Item label={"Nombre"} name={"nombre"}>
          <Input name={"nombre"} onChange={changeModel} />
        </Form.Item>
        <Form.Item label={"Tipo"} name={"tipo"}>
          <Select value={model.tipo} onSelect={typeSelect}>
            {roles.map((role: any) => <Select value={role.id}>{role.name}</Select>)}
          </Select>
        </Form.Item>
        {!isEdit && (
          <Form.Item label={"Contraseña"} name={"pass"}>
            <Input.Password name={"pass"} onChange={changeModel} />
          </Form.Item>
        )}
        <Form.Item label={"Email"} name={"email"}>
          <Input name={"email"} onChange={changeModel} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
