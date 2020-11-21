import { Modal, Form, Input, Select, Button, notification } from "antd";

import Currency from "models/Currency";
import User from "models/User";
import React, { useEffect, useState } from "react";
import API from "utils/API";

export default (props: any) => {
  const [companyForm] = Form.useForm();
  const [model, setModel] = useState<Currency>(new Currency());
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

    const endpoint = props.data.id ? "EditCurrency" : "AddCurrency";

    API.post(`setting/${endpoint}`, model)
      .then(() => {
        notification.success({
          message: "MONEDA",
          description: "Moneda guardado correctamente.",
        });
        props.close();
      })
      .catch(() => {
        notification.success({
          message: "ERROR",
          description: "Ocurrió un error al crear el moneda.",
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
      title={"Mantenimiento de moneda"}
      footer={[
        <Button loading={loading} type={"primary"} onClick={save}>
          {model.id ? "Editar" : "Guardar"}
        </Button>,
        <Button onClick={props.close}>Cancelar</Button>,
      ]}
    >
      <Form form={companyForm} {...layout}>
        <Form.Item label={"Id Moneda"} name={"idMoneda"}>
          <Input disabled={isEdit} name={"idMoneda"} onChange={changeModel} />
        </Form.Item>
        <Form.Item label={"Descripcion"} name={"descripcion"}>
          <Input name={"descripcion"} onChange={changeModel} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
