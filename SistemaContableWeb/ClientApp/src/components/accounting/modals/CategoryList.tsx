import { Button, Col, List, Modal, Row, Typography } from 'antd'
import { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import API, { handleError, handleSuccess } from 'utils/API'
import { DELETE_CATEGORY, GET_CATEGORIES } from 'utils/Routes'
import {
    FolderAddOutlined,
    EditTwoTone,
    DeleteTwoTone
} from "@ant-design/icons";
import AddCategory from './AddCategory'
import Category from 'models/Category'

export default (props: any) => {

    const [categories, setCategories] = useState(new Array)
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState<Category>(new Category())

    useEffect(() => {
        if (props.visible)
            getCategories()
    }, [props.visible])

    useEffect(() => {
        if (!visible)
            getCategories()
    }, [visible])


    const toggleVisible = () => setVisible(!visible)

    const getCategories = () => API.get(GET_CATEGORIES)
        .then((response: AxiosResponse) => setCategories([...response.data]))
        .catch(handleError)

    const deleteCategory = (category: Category) => Modal.confirm({
        content: '¿Desea borrar esta categoría?',
        onOk: () => API.post(DELETE_CATEGORY, category)
            .then(handleSuccess)
            .catch(handleError)
            .finally(() => getCategories())
    })

    const edit = (data: Category) => {
        toggleVisible()
        setSelected({ ...data })
    }

    return <>
        <Modal
            title={'Lista de categorías'}
            visible={props.visible}
            onCancel={props.close}
            footer={[
                <Button onClick={toggleVisible} icon={<FolderAddOutlined translate />} type={'primary'}>Crear categoría</Button>
            ]}>
            <List
                style={{ height: '500px', overflowY: 'auto' }}
                bordered
                size={'small'}
                dataSource={categories}
                renderItem={(item: Category) => <List.Item>
                    <Row gutter={8} justify={'space-around'}>
                        <Col>
                            <Typography.Text>{item.descripcion}</Typography.Text>
                        </Col>
                        <Col>
                            <Button.Group>
                                <Button onClick={() => edit(item)} type={'link'} icon={<EditTwoTone twoToneColor={'#0000cc'} translate />} />
                                <Button onClick={() => deleteCategory(item)} type={'link'} icon={<DeleteTwoTone twoToneColor={'#e50000'} translate />} />
                            </Button.Group>
                        </Col>
                    </Row>

                </List.Item>} />
        </Modal>

        <AddCategory visible={visible} close={toggleVisible} data={selected} />
    </>
}