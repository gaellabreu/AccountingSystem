import { Button, Card, Checkbox, Modal, notification } from 'antd'
import { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import API from 'utils/API'

export default (props: any) => {

    const [companies, setCompanies] = useState(new Array)
    const [user, setUser] = useState('')

    useEffect(() => {
        if (props.visible)
            getCompanies()
    }, [props.visible])

    useEffect(() => {
        if (props.userId)
            getUser()
    }, [props.visible])

    const getUser = () => API.get(`setting/GetUser?id=${props.userId}`)
        .then((response: AxiosResponse) => setUser(response.data.usuario))
        .catch(() => notification.error({
            message: 'Usuario',
            description: 'Ocurrió un error al obtener el usuario'
        }))

    const getCompanies = () => API.get(`setting/GetCompaniesByUser?userId=${props.userId}`)
        .then((response: AxiosResponse) => setCompanies([...response.data]))
        .catch(() =>
            notification.error({
                message: "ERROR",
                description: "Ocurrió un error al obtener el listado de empresas",
            })
        );

    const saveAccess = () => {
        const obj = companies.map((c: any) => {
            return {
                idEmpresa: c.id,
                idUsuario: props.userId,
                activo: c.assigned
            }
        })

        API.post('setting/SaveAccess', JSON.stringify(obj))
            .then(() => {
                notification.success({
                    message: 'ACCESOS',
                    description: 'Accesos guardados correctamente'
                })
                props.close()
            })
            .catch(() =>
                notification.error({
                    message: "ERROR",
                    description: "Ocurrió un error al obtener el listado de empresas",
                })
            )
            .finally(() => getCompanies())
    }

    const onCheckedChange = (id: number) => {
        const idx = companies.findIndex((c: any) => c.id == id)
        companies[idx].assigned = !companies[idx].assigned
        setCompanies([...companies])
    }

    return <Modal
        visible={props.visible}
        onCancel={props.close}
        destroyOnClose
        closable
        title={`Asignar Compañía - (${user.toUpperCase()})`}
        footer={[
            <Button type={'primary'} onClick={saveAccess}>Guardar</Button>
        ]}>
        {companies.map((c: any) => <Card hoverable onClick={() => onCheckedChange(c.id)}>
            <Checkbox onChange={() => onCheckedChange(c.id)} className={c.name} key={c.id} checked={c.assigned}>{c.name}</Checkbox>
        </Card>)}
    </Modal>
}