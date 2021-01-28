export default class AuthenticatedUser {
    constructor(obj = null) {
        Object.assign(this, obj)
    }

    companyId = 0
    companyName = ''
    username = ''
}