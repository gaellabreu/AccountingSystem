export default class LoginModel {
    constructor(obj: any = null) {
        if (obj)
            Object.assign(this, obj)
    }

    username = ''
    password = ''
    company = 0
}