const generatePassHash = password => {
    const bcrypt = require('bcryptjs')
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

const initUser = db => async () => {
    const count = await db('users as u').count('u.id as total')
    if (0 === count[0].total) {
        const user = {
            name: 'admin',
            email: 'admin@admin.com',
            password: generatePassHash('MinhaSenhaDificil!'),
            email_checked: true,
            created: new Date(),
            updated: new Date(),
            roles: 'admin,financial,customer',
        }
        await db('users').insert(user)
        console.log('created user:', user)
    } else {
        console.log(`já existe usuário`)
    }
}

module.exports = {
    initUser,
}