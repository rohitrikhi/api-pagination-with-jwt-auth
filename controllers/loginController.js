require('dotenv').config()
const Employee = require('../models/employee')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function login(req, res) {
    try {
        let user = null
        if(req.body.email && req.body.password){
            user = await Employee.findOne({
            email: req.body.email
        }, {
            password: 1,
            designation: 1
        })}
        if(!user){
            res.status(404).json({message:'User not found. Please register.'})
        }
        if (user && await bcrypt.compare(req.body.password, user.password)) {
            const payload = {
                username: req.body.email,
                designation: user.designation
            }
            let token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 15*60})
            res.json({
                token: token
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).send(String(error))
    }
}

module.exports = login