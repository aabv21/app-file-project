const AppError = require('../utils/appError')
const {
  fetchFileNames,
  fetchFileContent
} = require('../integrations/echoServer/echoServerFilesService')
const { parseCsvContent } = require('../utils/csvParser')

const getFileList = async ({ fetchFileNamesFn = fetchFileNames } = {}) => {
  try {
    const fileNames = await fetchFileNamesFn()

    return Array.isArray(fileNames) ? fileNames : []
  } catch (error) {
    throw new AppError('Failed to retrieve file list', 502, {
      details: { cause: error.message }
    })
  }
}

/**
 * Fetches and aggregates file data from the echo-server API.
 * @returns {Promise<Array>} Aggregated file payloads ready for the controller layer.
 */
const getFilesData = async ({
  fetchFileNamesFn = fetchFileNames,
  fetchFileContentFn = fetchFileContent,
  fileName
} = {}) => {
  const fileNames = await getFileList({ fetchFileNamesFn })

  const namesToProcess =
    typeof fileName === 'string' && fileName.trim() !== ''
      ? fileNames.filter(current => current === fileName)
      : fileNames

  if (!Array.isArray(namesToProcess) || namesToProcess.length === 0) {
    return []
  }

  const fileResults = await Promise.all(
    namesToProcess.map(async currentFile => {
      if (typeof currentFile !== 'string' || currentFile.trim() === '') {
        return null
      }

      try {
        const csvContent = await fetchFileContentFn(currentFile)
        const parsedLines = parseCsvContent(csvContent, currentFile)

        return {
          file: currentFile,
          lines: parsedLines
        }
      } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
          console.warn(`Skipping file ${currentFile}: ${error.message}`)
        }
        return null
      }
    })
  )

  return fileResults.filter(result => result && Array.isArray(result.lines))
}

module.exports = {
  getFileList,
  getFilesData
}
