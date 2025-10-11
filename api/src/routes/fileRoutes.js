const { Router } = require('express')

const fileController = require('../controllers/fileController')
const asyncHandler = require('../utils/asyncHandler')

const router = Router()

router.get('/list', asyncHandler(fileController.listFiles))
router.get('/data', asyncHandler(fileController.getFilesData))

module.exports = router
