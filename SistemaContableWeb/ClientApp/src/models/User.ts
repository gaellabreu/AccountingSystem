export default class User {
    constructor(obj = null){
        Object.assign(this, obj)
    }

    id = 0
    usuario = ''
    nombre = ''
    email = ''
    tipo = 0
    pass = ''
}