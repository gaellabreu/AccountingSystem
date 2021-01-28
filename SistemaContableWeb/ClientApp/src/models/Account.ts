import moment from "moment"

export default class Account {
    constructor(obj = null) {
        Object.assign(this, obj)
    }

    idcuenta = 0
    cuenta = ''
    descripcion = ''
    idcategoria = 0
    tipocontabilizacion = 0
    tiposaldo = 0
    idMoneda = 0
    usuario = ''
    fechacreacion = moment().format()
    fechamodificacion = moment().format()
}