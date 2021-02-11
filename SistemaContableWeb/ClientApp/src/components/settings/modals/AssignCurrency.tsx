import { Button, Divider, List, Select, Tag, Typography } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import { AxiosResponse } from 'axios'
import Company from 'models/Company'
import Currency from 'models/Currency'
import CurrencyAccess from 'models/CurrencyAccess'
import React, { useEffect, useState } from 'react'
import API, { handleError, handleSuccess } from 'utils/API'
import { ASSIGN_CURRENCY, GET_COMPANIES, GET_CURRENCIES, LIST_COMPANY_ASSIGNED_CURRENCY } from 'utils/Routes'
import { Xselect } from '../../common/Xselect'

export default (props: any) => {

    const [currencies, setCurrencies] = useState(new Array<Currency>())
    const [companies, setCompanies] = useState(new Array<Company>())
    const [model, setModel] = useState<CurrencyAccess>(new CurrencyAccess())
    const [assignedList, setAssignedList] = useState(new Array())

    useEffect(() => {
        if (props.visible) {
            getCompanies()
            getCurrencies()
            getAllAssigned()
        }
        else
            setModel({ ...new CurrencyAccess() })
    }, [props.visible])

    const assignCurrency = () => API.post(ASSIGN_CURRENCY, model)
        .then((response: AxiosResponse) => {
            props.close()
            handleSuccess(response)
        }).catch(handleError)
        .finally(() => getAllAssigned())

    const getCompanies = () => API.get(GET_COMPANIES)
        .then((response: AxiosResponse) => setCompanies([...response.data]))
        .catch(handleError)

    const getCurrencies = () => API.get(GET_CURRENCIES)
        .then((response: AxiosResponse) => setCurrencies([...response.data]))
        .catch(handleError)

    const getAllAssigned = () => API.get(LIST_COMPANY_ASSIGNED_CURRENCY)
        .then((response: AxiosResponse) => setAssignedList([...response.data]))
        .catch(handleError)

    return <Modal
        visible={props.visible}
        onCancel={props.close}
        destroyOnClose
        closable
        title={'Asignar moneda funcional'}
        footer={[
            <Button key={0} onClick={assignCurrency} type={'primary'}>Asignar moneda</Button>,
            <Button key={1} onClick={props.close} danger>Cancelar</Button>
        ]}>
        <Xselect aria-label={'Empresa'} style={{ width: 300 }} onSelect={(value: number) => setModel({ ...model, ...{ IdEmpresa: value } })}>
            {companies.map((company: Company, idx: number) => <Select.Option key={idx} value={company.id}>{company.nombre}</Select.Option>)}
        </Xselect>
        <Xselect aria-label={'Moneda'} style={{ width: 300 }} onSelect={(value: number) => setModel({ ...model, ...{ IDMonedaAcc: value } })}>
            {currencies.map((currency: Currency, idx: number) => <Select.Option key={idx} value={currency.id}>{`(${currency.idMoneda}) ${currency.descripcion}`}</Select.Option>)}
        </Xselect>

        <Divider orientation={'left'}>Monedas asignadas</Divider>

        <List
            dataSource={assignedList}
            renderItem={(item: any, idx: number) => <List.Item key={idx}>
                <Tag>{`${item.company} > ${item.currency} - ${item.description}`}</Tag>
            </List.Item>} />

    </Modal>
}