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

    const overlay = () => <Menu>
        <Menu.Item icon={<EditOutlined translate />}>Editar</Menu.Item>
        <Menu.Item icon={<DeleteOutlined translate />}>Eliminar</Menu.Item>
    </Menu>

    return <Modal
        visible={props.visible}
        onCancel={props.close}
        destroyOnClose
        closable
        title={'Asignar Moneda'}>
        <Select style={{ width: 300 }} placeholder={'Moneda...'}>
            <Select.Option key={1} value={'DOP'}>{'Peso Dominicano (DOP)'}</Select.Option>
            <Select.Option key={2} value={'DOP'}>{'Dolar Estadounidense (USD)'}</Select.Option>
        </Select>
        <br />
        <br />
        <Select style={{ width: 300 }} placeholder={'Empresa...'}>
            <Select.Option key={1} value={'Pan Pepín'}>{'Pan Pepín'}</Select.Option>
            <Select.Option key={2} value={'Taramaca'}>{'Taramaca'}</Select.Option>
            <Select.Option key={3} value={'Max'}>{'Max'}</Select.Option>
        </Select>

    </Modal>
}