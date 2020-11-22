import { Modal, Form, Input, Select, Button, notification, Checkbox } from "antd";
import { AxiosResponse } from "axios";
import User from "models/User";
import React, { useEffect, useState } from "react";
import API, { handleError } from "utils/API";

export default (props: any) => {
    const [userForm] = Form.useForm();
    const [model, setModel] = useState<User>(new User());
    const [loading, setLoading] = useState(false);

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    };

    const checkboxLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const changeModel = () => { }
    const save = () => { }
    const typeSelect = () => { }
    const isEdit = false;

    useEffect(() => {
        userForm.setFieldsValue(model);
    }, [model]);

    return (
        <Modal
            visible={props.visible}
            onCancel={props.close}
            destroyOnClose={true}
            title={"Mantenimiento de usuario"}
            footer={[
                <Button type={'danger'} onClick={props.close}>Cancelar</Button>,
                <Button loading={loading} type={"primary"} onClick={save}>
                    {model.id ? "Editar" : "Guardar"}
                </Button>
            ]}>
            <Form form={userForm} {...layout}>
                <Form.Item label={"Cuentas"} name={"accounts"}>
                    <Input disabled={isEdit} name={"accounts"} onChange={changeModel} />
                </Form.Item>
                <Form.Item label={"Descripción"} name={"description"}>
                    <Input name={"description"} onChange={changeModel} />
                </Form.Item>
                <Form.Item label={"Categoría"} name={"category"}>
                    <Select onSelect={typeSelect}>
                    </Select>
                </Form.Item>
                <Form.Item label={"Moneda"} name={"currency"}>
                    <Select onSelect={typeSelect}>
                    </Select>
                </Form.Item>
                <Form.Item {...checkboxLayout} label={'Tipo de contabilización'} name={'type'}>
                    <Checkbox>Balance general</Checkbox>
                    <Checkbox>Partidas y ganancias</Checkbox>
                </Form.Item>
                <Form.Item {...checkboxLayout} label={'Saldo Típico'} name={'balance'}>
                    <Checkbox>Debito</Checkbox>
                    <Checkbox>Crédito</Checkbox>
                </Form.Item>
            </Form>
        </Modal>
    );
};
