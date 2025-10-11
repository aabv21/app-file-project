const config = require('../../config')
const EchoServerClient = require('./echoServerClient')

const echoServerClient = new EchoServerClient(config.echoServer)

/**
 * Retrieves the available files from the echo-server API.
 * @returns {Promise<string[]>}
 */
const fetchFileNames = async () => echoServerClient.listFiles()

/**
 * Downloads the CSV content for a given file from echo-server.
 * @param {string} fileName
 * @returns {Promise<string>}
 */
const fetchFileContent = async fileName => echoServerClient.downloadFile(fileName)

module.exports = {
  fetchFileNames,
  fetchFileContent
}
