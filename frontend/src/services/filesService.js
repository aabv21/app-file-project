import apiClient from './apiClient'

export const getFileList = async () => {
  const response = await apiClient.get('/files/list')
  return response.data?.files ?? []
}

export const getFilesData = async fileName => {
  const params = {}
  if (fileName && fileName.trim() !== '') {
    params.fileName = fileName.trim()
  }
  const response = await apiClient.get('/files/data', { params })
  return response.data?.files ?? []
}
