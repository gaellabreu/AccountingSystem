import moment from "moment"

export default class EntryHeader {
    constructor(obj = null) {
        Object.assign(this, obj)
    }

    id = 0
    entrada = 0
    fecha = moment().format()
    origen = 1
    moneda = 0
    referencia = ''
    rate = 0
}