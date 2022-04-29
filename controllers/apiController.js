const Project = require('../models/project')

async function apiController(req, res) {
    // console.log(req.user)
    if (req.user && !req.query.page || !req.query.limit) {
        res.status(404).json({
            message: "API expects 'page' and 'limit' in query string"
        })
    }
    if (req.user && req.user.designation === 'manager' && req.query.page !== undefined && req.query.limit !== undefined) {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const totalDocuments = await Project.countDocuments().exec()
        const results = {}
        results.totalItems = totalDocuments
        if (endIndex < totalDocuments) {
            results.next = {
                page: page + 1,
                size: limit
            }
            results.hasMore = true
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                size: limit
            }
        }
        try {
            results.data = await Project.find().limit(limit).skip(startIndex).exec()
            res.json(results)
        } catch (error) {
            res.status(500).json({
                message: String(error)
            })
        }
    }
    if (req.user && req.query.page && req.query.limit && req.user.designation !== 'manager') {
        res.status(403).json({message: 'Access Denied. Only for Managers.'})
    }
}

module.exports = apiController