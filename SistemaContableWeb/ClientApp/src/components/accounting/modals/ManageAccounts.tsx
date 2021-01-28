import { Modal, Form, Input, Select, Button, Typography } from "antd";
import { AxiosResponse } from "axios";
import Account from "models/Account";
import Category from "models/Category";
import moment from "moment";
import React, { useEffect, useState } from "react";
import API, { handleError, handleSuccess } from "utils/API";
import { ADD_ACCOUNTS, EDIT_ACCOUNTS, GET_CATEGORIES, LIST_ASSIGNED_CURRENCY } from 'utils/Routes'
import MaskedInput from '../../common/MaskedInput'

export default (props: any) => {
    const [userForm] = Form.useForm();
    const [model, setModel] = useState<Account>(new Account());
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState(new Array<Category>())
    const [currencies, setCurrencies] = useState(new Array())

    useEffect(() => {
        if (props.visible) {
            setModel(props.data)
            getCategories()
            getCurrencies()
        }
    }, [props.visible])

    useEffect(() => {
        userForm.setFieldsValue(model);
    }, [model]);

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const changeModel = (e: any) => setModel({ ...model, ...{ [e.target.name]: e.target.value } })
    const changeSelectModel = (name: string, value: any) => setModel({ ...model, ...{ [name]: value } })

    const save = () => {
        setLoading(true)
        API.post(model.idcuenta ? EDIT_ACCOUNTS : ADD_ACCOUNTS, model)
            .then(handleSuccess)
            .catch(handleError)
            .finally(() => {
                setLoading(false)
                props.close()
            })
    }

    const getCategories = () => API.get(GET_CATEGORIES)
        .then((response: AxiosResponse) => setCategories([...response.data]))
        .catch(handleError)

    const getCurrencies = () => API.get(LIST_ASSIGNED_CURRENCY)
        .then((response: AxiosResponse) => setCurrencies([...response.data]))
        .catch(handleError)


    return (
        <Modal
            visible={props.visible}
            onCancel={props.close}
            destroyOnClose={true}
            title={"Mantenimiento de usuario"}
            footer={[
                <Button key={0} danger onClick={props.close}>Cancelar</Button>,
                <Button key={1} loading={loading} type={"primary"} onClick={save}>
                    {model.idcuenta ? "Editar" : "Guardar"}
                </Button>
            ]}>
            <Form form={userForm} {...layout}>
                <Form.Item label={"Cuenta"} name={"cuenta"}>
                    <MaskedInput value={model.cuenta} mask={'999-9999-999'} alwaysShowMask disabled={model.idcuenta} name={"cuenta"} onChange={changeModel} />
                </Form.Item>
                <Form.Item label={"Descripción"} name={"descripcion"}>
                    <Input value={model.descripcion} name={"descripcion"} onChange={changeModel} />
                </Form.Item>
                <Form.Item label={"Categoría"} name={"idcategoria"}>
                    <Select value={model.idcategoria} onSelect={(value: any) => changeSelectModel('idcategoria', value)}>
                        <Select.Option value={0}>{' '}</Select.Option>
                        {categories.map((categoy: Category) => <Select.Option value={categoy.idcategoria}>{categoy.descripcion}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item label={"Moneda"} name={"idMoneda"}>
                    <Select value={model.idMoneda} onSelect={(value: any) => changeSelectModel('idMoneda', value)}>
                        {currencies.map((currency: any) => <Select.Option key={currency.id} value={currency.id}>{`(${currency.currency}) - ${currency.description}`}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item label={"Tipo de contabilización"} name={"tipocontabilizacion"}>
                    <Select value={model.tipocontabilizacion} onSelect={(value: any) => changeSelectModel('tipocontabilizacion', value)}>
                        <Select.Option value={0}>{' '}</Select.Option>
                        <Select.Option value={1}>Balance general</Select.Option>
                        <Select.Option value={2}>Partida y ganancias</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label={"Tipo de saldo"} name={"tiposaldo"}>
                    <Select value={model.tiposaldo} onSelect={(value: any) => changeSelectModel('tiposaldo', value)}>
                        <Select.Option value={0}>{' '}</Select.Option>
                        <Select.Option value={1}>Débito</Select.Option>
                        <Select.Option value={2}>Crédito</Select.Option>
                    </Select>
                </Form.Item>
            </Form>

            {model.idcuenta ? <Typography.Text type={'secondary'}>{`Fecha de creación: ${moment(model.fechacreacion).format('DD/MM/YYYY mm:ss')}`}</Typography.Text> : <></>}
            <br />
            {model.idcuenta ? <Typography.Text type={'secondary'}>{`Modificado en: ${moment(model.fechamodificacion).format('DD/MM/YYYY mm:ss')}`}</Typography.Text> : <></>}
            <br />
            {model.idcuenta ? <Typography.Text type={'secondary'}>{`Modificado por: ${model.usuario}`}</Typography.Text> : <></>}
        </Modal>
    );
};
