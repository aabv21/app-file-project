import { Col, Form, Row } from 'react-bootstrap'

const FileFilter = ({ fileList, selectedFile, onSelect }) => (
  <Form className="mb-3">
    <Row className="g-2 align-items-end">
      <Col xs={12} md={6} lg={4}>
        <Form.Group controlId="fileFilterSelect">
          <Form.Label className="fw-semibold">Filter by file name</Form.Label>
          <Form.Select
            value={selectedFile}
            onChange={event => onSelect(event.target.value)}
            aria-label="Filter files by name"
          >
            <option value="">All files</option>
            {fileList.map(fileName => (
              <option key={fileName} value={fileName}>
                {fileName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Col>
    </Row>
  </Form>
)

export default FileFilter
