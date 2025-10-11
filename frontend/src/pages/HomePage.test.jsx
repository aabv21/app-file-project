import { describe, it, expect, jest, beforeEach } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import HomePage from './HomePage.jsx'

jest.mock('../hooks/useFilesData.js', () => ({
  __esModule: true,
  default: jest.fn()
}))

import useFilesData from '../hooks/useFilesData.js'

function renderPage() {
  return render(<HomePage />)
}

beforeEach(() => {
  useFilesData.mockReset()
})

describe('HomePage', () => {
  it('shows loading state initially', () => {
    useFilesData.mockReturnValue({
      fileList: [],
      rows: [],
      selectedFile: '',
      selectFile: jest.fn(),
      loading: true,
      error: null,
      hasData: false,
      refreshList: jest.fn()
    })

    renderPage()
    expect(screen.getByText(/loading files/i)).toBeInTheDocument()
  })

  it('renders table when data is available', () => {
    useFilesData.mockReturnValue({
      fileList: ['file1.csv'],
      rows: [
        { file: 'file1.csv', text: 'Row 1', number: 123, hex: 'abcdef' }
      ],
      selectedFile: '',
      selectFile: jest.fn(),
      loading: false,
      error: null,
      hasData: true,
      refreshList: jest.fn()
    })

    renderPage()
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByText('Row 1')).toBeInTheDocument()
  })

  it('renders error message when present', () => {
    useFilesData.mockReturnValue({
      fileList: [],
      rows: [],
      selectedFile: '',
      selectFile: jest.fn(),
      loading: false,
      error: 'Oops',
      hasData: false,
      refreshList: jest.fn()
    })

    renderPage()
    expect(screen.getByText('Oops')).toBeInTheDocument()
  })
})
