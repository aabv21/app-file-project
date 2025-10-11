import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getFileList, getFilesData } from '../../services/filesService.js'

const initialState = {
  fileList: [],
  files: [],
  selectedFile: '',
  listLoading: false,
  dataLoading: false,
  error: null,
  dataLoaded: false
}

export const fetchFileList = createAsyncThunk('files/fetchList', async (_, { rejectWithValue }) => {
  try {
    const files = await getFileList()
    return files
  } catch (error) {
    return rejectWithValue(error?.message ?? 'Unable to load file list')
  }
})

export const fetchFilesData = createAsyncThunk(
  'files/fetchData',
  async (fileName, { rejectWithValue }) => {
    try {
      const data = await getFilesData(fileName)
      return {
        data,
        fileName
      }
    } catch (error) {
      return rejectWithValue(error?.message ?? 'Unable to load file data')
    }
  }
)

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    setSelectedFile: (state, action) => {
      state.selectedFile = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFileList.pending, state => {
        state.listLoading = true
        state.error = null
      })
      .addCase(fetchFileList.fulfilled, (state, action) => {
        state.fileList = action.payload
        state.listLoading = false
        state.error = null
      })
      .addCase(fetchFileList.rejected, (state, action) => {
        state.listLoading = false
        state.error = action.payload ?? 'Unable to load file list'
        state.fileList = []
      })
      .addCase(fetchFilesData.pending, state => {
        state.dataLoading = true
        state.error = null
      })
      .addCase(fetchFilesData.fulfilled, (state, action) => {
        state.files = action.payload.data
        state.selectedFile = action.payload.fileName ?? ''
        state.dataLoading = false
        state.error = null
        state.dataLoaded = true
      })
      .addCase(fetchFilesData.rejected, (state, action) => {
        state.dataLoading = false
        state.error = action.payload ?? 'Unable to load file data'
        state.files = []
        state.dataLoaded = true
      })
  }
})

export const { setSelectedFile } = filesSlice.actions

export default filesSlice.reducer
