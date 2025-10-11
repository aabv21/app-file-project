const axios = require('axios')

/**
 * Echo-server API client responsible for retrieving file metadata and content.
 */
class EchoServerClient {
  /**
   * @param {{ baseURL: string, token: string, timeout: number }} options
   */
  constructor ({ baseURL, token, timeout }) {
    this.baseURL = baseURL
    this.token = token
    this.timeout = timeout

    this.http = axios.create({
      baseURL: this.baseURL,
      timeout: this.timeout,
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
  }

  /**
   * Retrieves the available file names from the echo-server API.
   * @returns {Promise<string[]>}
   */
  async listFiles () {
    const response = await this.http.get('/files', {
      headers: {
        Accept: 'application/json'
      }
    })

    const payload = response.data

    if (Array.isArray(payload)) {
      return payload
    }

    if (payload && Array.isArray(payload.files)) {
      return payload.files
    }

    return []
  }

  /**
   * Downloads the raw CSV content for a given file name from echo-server.
   * @param {string} fileName
   * @returns {Promise<string>}
   */
  async downloadFile (fileName) {
    const response = await this.http.get(`/file/${fileName}`, {
      responseType: 'text',
      headers: {
        Accept: 'text/csv'
      }
    })

    return response.data
  }
}

module.exports = EchoServerClient
