import { Button, Checkbox, Divider, Dropdown, Menu, Select } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import React from 'react'
import {
    FileAddOutlined,
    SearchOutlined,
    EditOutlined,
    DeleteOutlined,
    DollarOutlined,
    SettingOutlined
} from '@ant-design/icons';

export default (props: any) => {

    return <Modal
        visible={props.visible}
        onCancel={props.close}
        destroyOnClose
        closable
        title={'Opciones Avanzadas'}>
        <Select style={{ width: 300 }} placeholder={'Empresa...'}>
            <Select.Option key={1} value={'Pan Pepín'}>{'Pan Pepín'}</Select.Option>
            <Select.Option key={2} value={'Taramaca'}>{'Taramaca'}</Select.Option>
            <Select.Option key={3} value={'Max'}>{'Max'}</Select.Option>
        </Select>

        <Divider>Ventas</Divider>
        <Checkbox>
            Generar Contabilidad en Ventas
        </Checkbox>
        <br />
        <Checkbox>
            Mantener Historico en Ventas
        </Checkbox>

        <Divider>Compras</Divider>
        <Checkbox>
            Generar Contabilidad en Compras
        </Checkbox>
        <br />
        <Checkbox>
            Mantener Historico en Compras
        </Checkbox>

        <Divider>Inventario</Divider>
        <Checkbox>
            Generar Contabilidad en Inventario
        </Checkbox>
        <br />
        <Checkbox>
            Mantener Historico en Inventario
        </Checkbox>

        <Divider>Nómina</Divider>
        <Checkbox>
            Generar Contabilidad en Nómina
        </Checkbox>
        <br />
        <Checkbox>
            Mantener Historico en Nómina
        </Checkbox>

        <Divider>Otros</Divider>
        <Checkbox>
            Generar Comprobantes Documentos Históricos
        </Checkbox>
    </Modal>
}