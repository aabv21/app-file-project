/* eslint-env mocha */

const { expect } = require('chai')

const fileService = require('../../src/services/fileService')
const AppError = require('../../src/utils/appError')

describe('fileService', () => {
  describe('getFileList()', () => {
    it('returns the file names using the injected dependency', async () => {
      const result = await fileService.getFileList({
        fetchFileNamesFn: async () => ['file1.csv', 'file2.csv']
      })

      expect(result).to.deep.equal(['file1.csv', 'file2.csv'])
    })

    it('throws AppError when the dependency fails', async () => {
      try {
        await fileService.getFileList({
          fetchFileNamesFn: async () => {
            throw new Error('boom')
          }
        })
        throw new Error('the test should have failed')
      } catch (error) {
        expect(error).to.be.instanceOf(AppError)
        expect(error.statusCode).to.equal(502)
        expect(error.details).to.deep.equal({ cause: 'boom' })
      }
    })
  })

  describe('getFilesData()', () => {
    const validCsv = [
      'file,text,number,hex',
      'file1.csv,Row One,123,70ad93aac0b690b00467fe2b2767f765'
    ].join('\n')

    it('transforms the files into the expected format', async () => {
      const result = await fileService.getFilesData({
        fetchFileNamesFn: async () => ['file1.csv'],
        fetchFileContentFn: async () => validCsv
      })

      expect(result).to.deep.equal([
        {
          file: 'file1.csv',
          lines: [
            {
              text: 'Row One',
              number: 123,
              hex: '70ad93aac0b690b00467fe2b2767f765'
            }
          ]
        }
      ])
    })

    it('filters by file name when fileName is provided', async () => {
      const result = await fileService.getFilesData({
        fetchFileNamesFn: async () => ['file1.csv', 'file2.csv'],
        fetchFileContentFn: async fileName => {
          if (fileName === 'file1.csv') {
            return validCsv
          }
          return validCsv.replace(/file1\.csv/g, fileName).replace('Row One', 'Row Two')
        },
        fileName: 'file2.csv'
      })

      expect(result).to.have.lengthOf(1)
      expect(result[0].file).to.equal('file2.csv')
    })

    it('skips files whose content fails to parse', async () => {
      const result = await fileService.getFilesData({
        fetchFileNamesFn: async () => ['file1.csv', 'file-error.csv'],
        fetchFileContentFn: async fileName => {
          if (fileName === 'file-error.csv') {
            throw new Error('download failed')
          }
          return validCsv
        }
      })

      expect(result).to.deep.equal([
        {
          file: 'file1.csv',
          lines: [
            {
              text: 'Row One',
              number: 123,
              hex: '70ad93aac0b690b00467fe2b2767f765'
            }
          ]
        }
      ])
    })
  })
})
