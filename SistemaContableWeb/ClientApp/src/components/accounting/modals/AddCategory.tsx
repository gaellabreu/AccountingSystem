import { Button, Input, Modal, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import API, { handleError, handleSuccess } from 'utils/API'
import { ADD_CATEGORY, CATEGORY_EXISTS, EDIT_CATEGORY } from 'utils/Routes'
import { FolderAddOutlined } from "@ant-design/icons";
import Category from 'models/Category';

export default (props: any) => {

    const [model, setModel] = useState<Category>(new Category())

    useEffect(() => {
        setModel({ ...model, ...new Category() })
    }, [props.visible])

    useEffect(() => {
        if (props.data?.idcategoria)
            setModel({ ...props.data })
    }, [props.data?.idcategoria])

    const save = async () => {
        const { data } = await API.get(`${CATEGORY_EXISTS}?descripcion=${model.descripcion}`)

        if (data) {
            notification.warning({ message: 'Esta categoría ya existe' })
            return
        }

        API.post(model.idcategoria ? EDIT_CATEGORY : ADD_CATEGORY, model)
            .then(handleSuccess)
            .catch(handleError)
            .finally(() => props.close())
    }

    const changeModel = (e: any) => setModel({ ...model, ...{ descripcion: e.target.value } })

    return <Modal
        title={'Categoría'}
        visible={props.visible}
        onCancel={props.close}
        footer={[
            <Button onClick={save} icon={<FolderAddOutlined translate />} type={'primary'}>{model.idcategoria ? 'Editar' : 'Guardar'}</Button>
        ]}>

        Nombre de categoría: <Input value={model.descripcion} onChange={changeModel} />

    </Modal>
}