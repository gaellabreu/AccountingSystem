import { Button, notification, Space, Tag } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import { AxiosResponse } from 'axios'
import { Xinput } from 'components/common/Xinput'
import Currency from 'models/Currency'
import moment from 'moment'
import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import API, { handleError, handleSuccess } from 'utils/API'
import { ADD_RATE } from 'utils/Routes'

export default (props: any) => {

    const [rate, setRate] = useState('0.00')

    const { general } = useSelector((state: any) => state)

    const { id, idMoneda } = useMemo(() => {
        if (props.moneda && general.currencies?.length)
            return general.currencies.find((c: Currency) => c.id == props.moneda)
        else
            return ''
    }, [props.moneda, general.currencies])

    const addRate = () => API.post(ADD_RATE, { idMoneda: id, fecha: props.date, tasa: Number.parseFloat(rate) })
        .then((resp: AxiosResponse) => {
            handleSuccess(resp)
            props.close()
        })
        .catch(handleError)

    return < Modal
        visible={props.visible}
        onCancel={props.close}
        footer={[
            <Button key={1} type={'primary'} onClick={addRate}>Guardar</Button>,
            <Button key={2}>Cerrar</Button>
        ]}>

        <Tag color={'blue'}>{idMoneda}</Tag>
        <Tag color={'blue'}>{moment(props.date).format('DD/MM/YYYY')}</Tag>

        <Space direction={'vertical'} />

        <Xinput aria-label={'Tasa'} type={'number'} value={rate} onChange={(e: any) => setRate(e.target.value)} />

    </Modal>
}