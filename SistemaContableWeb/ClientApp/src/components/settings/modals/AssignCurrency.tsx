import { Button, Select, Typography } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import { AxiosResponse } from 'axios'
import Company from 'models/Company'
import Currency from 'models/Currency'
import CurrencyAccess from 'models/CurrencyAccess'
import React, { useEffect, useState } from 'react'
import API, { handleError, handleSuccess } from 'utils/API'
import { ASSIGN_CURRENCY, GET_COMPANIES, GET_CURRENCIES } from 'utils/Routes'

export default (props: any) => {

    const [currencies, setCurrencies] = useState(new Array<Currency>())
    const [companies, setCompanies] = useState(new Array<Company>())
    const [model, setModel] = useState<CurrencyAccess>(new CurrencyAccess())

    useEffect(() => {
        if (props.visible) {
            getCompanies()
            getCurrencies()
        }
        else
            setModel({ ...new CurrencyAccess() })
    }, [props.visible])

    const assignCurrency = () => API.post(ASSIGN_CURRENCY, model)
        .then((response: AxiosResponse) => {
            props.close()
            handleSuccess(response)
        }).catch(handleError)

    const getCompanies = () => API.get(GET_COMPANIES)
        .then((response: AxiosResponse) => setCompanies([...response.data]))
        .catch(handleError)

    const getCurrencies = () => API.get(GET_CURRENCIES)
        .then((response: AxiosResponse) => setCurrencies([...response.data]))
        .catch(handleError)

    return <Modal
        visible={props.visible}
        onCancel={props.close}
        destroyOnClose
        closable
        title={'Asignar Moneda'}
        footer={[
            <Button onClick={assignCurrency} type={'primary'}>Asignar moneda</Button>,
            <Button onClick={props.close} danger>Cancelar</Button>
        ]}>
        <Typography.Text style={{ marginRight: '5px' }} strong>Moneda</Typography.Text>
        <Select style={{ width: 300 }} onSelect={(value: number) => setModel({ ...model, ...{ IDMonedaAcc: value } })}>
            {currencies.map((currency: Currency, idx: number) => <Select.Option key={idx} value={currency.id}>{`(${currency.idMoneda}) ${currency.descripcion}`}</Select.Option>)}
        </Select>
        <br />
        <br />
        <Typography.Text style={{ marginRight: '5px' }} strong>Empresa</Typography.Text>
        <Select style={{ width: 300 }} onSelect={(value: number) => setModel({ ...model, ...{ IdEmpresa: value } })}>
            {companies.map((company: Company, idx: number) => <Select.Option key={idx} value={company.id}>{company.nombre}</Select.Option>)}
        </Select>
    </Modal>
}