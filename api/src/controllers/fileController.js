const fileService = require('../services/fileService')
const AppError = require('../utils/appError')

/**
 * Handles GET /files/list requests.
 */
const listFiles = async (_req, res) => {
  try {
    const files = await fileService.getFileList()
    res.status(200).json({ files })
  } catch (error) {
    if (error instanceof AppError) {
      throw error
    }

    throw new AppError('Failed to fetch file list', 502, { details: { cause: error.message } })
  }
}

/**
 * Handles GET /files/data requests.
 */
const getFilesData = async (req, res) => {
  const { fileName } = req.query

  try {
    const fileData = await fileService.getFilesData({ fileName })
    res.status(200).json({ files: fileData })
  } catch (error) {
    if (error instanceof AppError) {
      throw error
    }

    throw new AppError('Failed to fetch file data', 502, { details: { cause: error.message } })
  }
}

module.exports = {
  listFiles,
  getFilesData
}
