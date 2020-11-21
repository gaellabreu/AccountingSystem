import { Button, Checkbox, Divider, Dropdown, Input, Menu, Select } from 'antd'
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
        title={'Asignar Moneda'}>

        <Input placeholder={'Moneda'} />
        <br />
        <br />
        <Input placeholder={'Descripción'} />

    </Modal>
}