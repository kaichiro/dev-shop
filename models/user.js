const bcrypt = require('bcryptjs')

const generatePassHash = passwd => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(passwd, salt)
    return hash
}

const initUser = db => async () => {
    const count = await db('users as u').count('u.id as total')
    if (0 === count[0].total) {
        const user = {
            name: 'admin',
            email: 'admin@admin.com',
            passwd: generatePassHash('admin'),
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

const login = db => async (email, passwd) => {
    const user = await db('users').select('*').where('email', email)
    if (0 === user.length) {
        throw new Error('Invalid user! (email not found)')
    }

    if (!bcrypt.compareSync(passwd, user[0].passwd)) {
        throw new Error('Invalid user! (passwd not found)')
    }

    return user[0]
}

module.exports = {
    initUser,
    login,
}