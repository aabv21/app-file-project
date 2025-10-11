const HEX_PATTERN = /^[0-9a-fA-F]{32}$/
const HEADER_SIGNATURE = 'file,text,number,hex'

/**
 * Converts raw CSV text into a normalized array of JSON line objects.
 * @param {string} csvContent - Raw CSV content.
 * @param {string} expectedFileName - File name used for validation.
 * @returns {Array<{text: string, number: number, hex: string}>}
 */
const parseCsvContent = (csvContent, expectedFileName) => {
  if (typeof csvContent !== 'string' || csvContent.trim() === '') {
    return []
  }

  const rows = csvContent.split(/\r?\n/).map(row => row.trim())
  if (rows.length === 0 || rows[0].toLowerCase() !== HEADER_SIGNATURE) {
    return []
  }

  const validLines = []

  for (let index = 1; index < rows.length; index += 1) {
    const line = rows[index]
    if (!line) {
      continue
    }

    const columns = line.split(',')
    if (columns.length !== 4) {
      continue
    }

    const [fileName, text, numberValue, hexValue] = columns.map(value => value.trim())

    if (!fileName || !text || !numberValue || !hexValue) {
      continue
    }

    if (expectedFileName && fileName !== expectedFileName) {
      continue
    }

    const number = Number.parseInt(numberValue, 10)
    if (!Number.isFinite(number)) {
      continue
    }

    if (!HEX_PATTERN.test(hexValue)) {
      continue
    }

    validLines.push({ text, number, hex: hexValue })
  }

  return validLines
}

module.exports = {
  parseCsvContent
}
