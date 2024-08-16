import bcrypt from "bcrypt"

const users = [
    {
        name:"poorana",
        email:"poorana@gmail.com",
        password:bcrypt.hashSync("123456", 12),
        isAdmin:true
    },
    {
        name:"selvan",
        email:"selvan@gmail.com",
        password:bcrypt.hashSync("123456", 12),
        isAdmin:false
    },
    {
        name:"suganya",
        email:"suganya@gmail.com",
        password:bcrypt.hashSync("123456", 12),
        isAdmin:true
    }
]

export default users;