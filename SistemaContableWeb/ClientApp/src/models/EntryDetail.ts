import moment from "moment"

export default class EntryDetail {
    constructor(obj = null) {
        Object.assign(this, obj)
    }

    key = ''
    id: number = 0
    entryId: number = 0
    cuentaId: number = 0
    cuenta: string = ''
    tasa: number = 0
    descripcion: string = ''
    moneda: number = 0
    origen: number = 0
    documento: string = ''
    credito: string = '0.00'
    debito: string = '0.00'
    usuario: string = ''
    creado: string = moment().format('DD/MM/YYYY hh:mm')
    modificado: string = moment().format('DD/MM/YYYY hh:mm')
    comentario: string = ''
}