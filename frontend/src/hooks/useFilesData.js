import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchFileList,
  fetchFilesData,
  setSelectedFile
} from '../store/slices/filesSlice.js'

const useFilesData = () => {
  const dispatch = useDispatch()
  const {
    fileList,
    files,
    selectedFile,
    listLoading,
    dataLoading,
    error,
    dataLoaded
  } = useSelector(state => state.files)

  // Load file list on mount.
  useEffect(() => {
    if (fileList.length === 0) {
      dispatch(fetchFileList())
    }
  }, [dispatch, fileList.length])

  // Fetch rows when selection changes.
  useEffect(() => {
    dispatch(fetchFilesData(selectedFile || undefined))
  }, [dispatch, selectedFile])

  // Sync dropdown selection with store.
  const handleSelectFile = useCallback(
    fileName => {
      dispatch(setSelectedFile(fileName))
    },
    [dispatch]
  )

  // Manual refresh re-fetches list and rows.
  const refreshList = useCallback(() => {
    dispatch(fetchFileList())
    dispatch(fetchFilesData(selectedFile || undefined))
  }, [dispatch, selectedFile])

  // Map normalized data into table rows.
  const rows = useMemo(() => {
    return files.flatMap(file => {
      if (!Array.isArray(file.lines) || file.lines.length === 0) {
        return []
      }

      return file.lines.map(line => ({
        file: file.file,
        text: line.text,
        number: line.number,
        hex: line.hex
      }))
    })
  }, [files])

  const hasData = rows.length > 0

  return {
    fileList,
    rows,
    rawFiles: files,
    selectedFile,
    selectFile: handleSelectFile,
    loading: listLoading || dataLoading,
    error,
    dataLoaded,
    hasData,
    refreshList
  }
}

export default useFilesData
