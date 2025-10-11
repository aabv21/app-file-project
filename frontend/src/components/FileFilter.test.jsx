import { describe, it, expect, jest } from '@jest/globals'
import { render, screen, fireEvent } from '@testing-library/react'
import FileFilter from './FileFilter.jsx'

describe('FileFilter', () => {
  const fileList = ['file1.csv', 'file2.csv']

  it('renders options and handles change', () => {
    const handleSelect = jest.fn()
    const handleRefresh = jest.fn()

    render(
      <FileFilter
        fileList={fileList}
        selectedFile=""
        onSelect={handleSelect}
        onRefresh={handleRefresh}
      />
    )

    const select = screen.getByLabelText(/filter files by name/i)
    expect(select).toBeInTheDocument()
    expect(select).toHaveDisplayValue('All files')

    fireEvent.change(select, { target: { value: 'file2.csv' } })
    expect(handleSelect).toHaveBeenCalledWith('file2.csv')

    fireEvent.click(screen.getByRole('button', { name: /refresh/i }))
    expect(handleRefresh).toHaveBeenCalled()
  })
})
