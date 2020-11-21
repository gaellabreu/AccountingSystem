export default class Company {
    constructor(obj = null){
        Object.assign(this, obj)
    }

    id = 0
    nombre = ''
    telefono = ''
    celular = ''
    contacto = 0
    rnc = ''
    direccion = ''
    ciudad = ''
    provincia = ''
}