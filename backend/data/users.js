import bcrypt from "bcrypt"

const users = [
    {
        name:"poorana",
        email:"poorana@gmail.com",
        password:bcrypt.hashSync("123456", 10),
        isAdmin:true
    },
    {
        name:"selvan",
        email:"selvan@gmail.com",
        password:bcrypt.hashSync("123456", 10),
        isAdmin:false
    },
    {
        name:"Test User 1",
        email:"test1@gmail.com",
        password:bcrypt.hashSync("123456", 10),
        isAdmin:true
    },
    {
        name:"Test User 2",
        email:"test2@gmail.com",
        password:bcrypt.hashSync("123456", 10),
        isAdmin:true
    }
]

export default users;