import bcrypt from 'bcryptjs'

const users = [
    {
        name : 'Admin User',
        email : 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name : 'shafi imam',
        email : 'shafi@example.com',
        password: bcrypt.hashSync('123456', 10),
    },{
        name : 'mafi imam',
        email : 'mafi@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
]

export default users;