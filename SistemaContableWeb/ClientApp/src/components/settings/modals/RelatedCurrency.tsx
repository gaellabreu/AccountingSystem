import { Button, List, Select, Typography } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import { AxiosResponse } from 'axios'
import Company from 'models/Company'
import React, { useEffect, useState } from 'react'
import API, { handleError } from 'utils/API'
import { GET_COMPANIES, LIST_ASSIGNED_CURRENCY } from 'utils/Routes'

export default (props: any) => {

    const [currencies, setCurrencies] = useState(new Array())
    const [companies, setCompanies] = useState(new Array<Company>())
    const [selected, setSelected] = useState(0)

    useEffect(() => {
        if (props.visible) {
            getCurrencies()
            getCompanies()
        }
    }, [props.visible])

    useEffect(() => {
        getCurrencies()
    }, [selected])

    const getCurrencies = () => API.get(`${LIST_ASSIGNED_CURRENCY}?empresa=${selected}`)
        .then((response: AxiosResponse) => setCurrencies([...response.data]))
        .catch(handleError)

    const getCompanies = () => API.get(GET_COMPANIES)
        .then((response: AxiosResponse) => setCompanies([...response.data]))
        .catch(handleError)

    return <Modal
        visible={props.visible}
        onCancel={props.close}
        destroyOnClose
        closable
        footer={[
            <Button onClick={props.close} danger>Cancelar</Button>
        ]}
        title={'Monedas asignadas'}>
        <Select style={{ width: 400 }} onSelect={(value: number) => setSelected(value)}>
            <Select.Option key={0} value={0}>{'Todas'}</Select.Option>
            {companies.map((company: Company) => <Select.Option key={company.id} value={company.id}>{company.nombre}</Select.Option>)}
        </Select>
        <List
            style={{ maxHeight: '500px', overflowY: 'auto' }}
            size={'small'}
            dataSource={currencies}
            renderItem={(item: any) => <List.Item key={item.id}>
                <Typography.Text>{item.currency}</Typography.Text> - {item.description}
            </List.Item>} />
    </Modal>
}