const bcrypt = require('bcrypt')
const Employee = require('../models/employee')

async function registration(req, res) {
    let userCheck = []
    if (!req.body.email || !req.body.name || !req.body.designation || !req.body.password) {
        res.status(400).json({message:'One or more parameter is missing'})
    } else {
        userCheck = await Employee.find({
            email: req.body.email
        })
        if (userCheck.length > 0) res.status(409).send({
            message: 'User already exist. Please Login.'
        })
        else {
            try {
                let newEmployee = new Employee({
                    name: req.body.name,
                    designation: req.body.designation,
                    email: req.body.email,
                    password: await bcrypt.hash(req.body.password, 12)
                })
                await newEmployee.save()
                res.json({message:'User Created Succesfully.'})
            } catch (error) {
                // console.log(error)
                res.status(500).send(String(error))
            }
        }
    }


}



module.exports = registration