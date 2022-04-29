require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const apiRoute = require('./routes/api')
const loginRoute = require('./routes/login')
const registrationRoute = require('./routes/registration')
const Project = require('./models/project')

mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true
})

//adding projects data once
const db = mongoose.connection
db.once('open', async()=>{
    if(await Project.countDocuments().exec() > 0) return
    Promise.all([
        Project.create({
            "name": "Big Corporation Office Construction",
            "projectManager": "James Anderson",
            "projectManagerEmail": "jamesanderson@gmail.com",
            "endDate": "2022-07-28T18:30:00.000Z",
            "startDate": "2022-04-28T18:30:00.000Z",
            "employees": [
                {
                    "name": "Will Smith",
                    "email": "willsmith@gmail.com",
                    "DOJ": "2022-04-28T18:30:00.000Z",
                    "departmentName": "planning"
                },
                {
                    "name": "James Anderson",
                    "email": "jamesanderson@gmail.com",
                    "DOJ": "2022-04-28T18:30:00.000Z",
                    "departmentName": "no name"
                }
            ]
        }),
        Project.create({
            "name": "City Airport Construction",
            "projectManager": "John Doe",
            "projectManagerEmail": "johndoe@gmail.com",
            "endDate": "2022-07-28T18:30:00.000Z",
            "startDate": "2022-04-28T18:30:00.000Z",
            "employees": [
                {
                    "name": "Will Smith",
                    "email": "willsmith@gmail.com",
                    "DOJ": "2022-04-28T18:30:00.000Z",
                    "departmentName": "planning"
                },
                {
                    "name": "John Doe",
                    "email": "johndoe@gmail.com",
                    "DOJ": "2022-04-28T18:30:00.000Z",
                    "departmentName": "no name"
                }
            ]
        })
    ]).then(()=>console.log('Added Projects data'))
})

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.disable('x-powered-by')

app.use('/projects', apiRoute)

app.use('/login', loginRoute)

app.use('/registration', registrationRoute)


//Unauthorised on all other routes
app.get("*", function (req, res) {
    res.sendStatus(401);
})
//start server on port
port = process.env.PORT || 3000
app.listen(3000, () => {
    console.log('server has started');
})