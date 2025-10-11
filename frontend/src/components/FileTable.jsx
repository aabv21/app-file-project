import { OverlayTrigger, Table, Tooltip } from 'react-bootstrap';

const FileTable = ({ rows }) => (
  <div className='table-responsive border rounded shadow-sm w-100'>
    <Table striped hover responsive className='mb-0 table-fixed'>
      <thead className='table-light'>
        <tr>
          <th scope='col' className='table-header table-column-file'>
            <OverlayTrigger
              placement='top'
              overlay={<Tooltip id='header-file-tooltip'>File Name</Tooltip>}
            >
              <span className='cell-content cell-content--truncate'>File Name</span>
            </OverlayTrigger>
          </th>
          <th scope='col' className='table-header table-column-text'>
            <OverlayTrigger
              placement='top'
              overlay={<Tooltip id='header-text-tooltip'>Text</Tooltip>}
            >
              <span className='cell-content cell-content--truncate'>Text</span>
            </OverlayTrigger>
          </th>
          <th scope='col' className='table-header table-column-number'>
            <OverlayTrigger
              placement='top'
              overlay={<Tooltip id='header-number-tooltip'>Number</Tooltip>}
            >
              <span className='cell-content cell-content--truncate'>Number</span>
            </OverlayTrigger>
          </th>
          <th scope='col' className='table-header table-column-hex'>
            <OverlayTrigger
              placement='top'
              overlay={<Tooltip id='header-hex-tooltip'>Hex</Tooltip>}
            >
              <span className='cell-content cell-content--truncate'>Hex</span>
            </OverlayTrigger>
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => {
          const rowKey = `${row.file}-${row.hex}-${row.number}`;
          return (
            <tr key={rowKey}>
              <td className='table-cell table-column-file' title={row.file}>
                <OverlayTrigger
                  placement='top'
                  overlay={<Tooltip id={`cell-file-${index}`}>{row.file}</Tooltip>}
                >
                  <span className='cell-content cell-content--truncate'>{row.file}</span>
                </OverlayTrigger>
              </td>
              <td className='table-cell table-column-text' title={row.text}>
                <OverlayTrigger
                  placement='top'
                  overlay={<Tooltip id={`cell-text-${index}`}>{row.text}</Tooltip>}
                >
                  <span className='cell-content cell-content--truncate'>{row.text}</span>
                </OverlayTrigger>
              </td>
              <td className='table-cell table-column-number' title={row.number}>
                <OverlayTrigger
                  placement='top'
                  overlay={<Tooltip id={`cell-number-${index}`}>{row.number}</Tooltip>}
                >
                  <span className='cell-content cell-content--truncate'>{row.number}</span>
                </OverlayTrigger>
              </td>
              <td className='table-cell table-column-hex' title={row.hex}>
                <OverlayTrigger
                  placement='top'
                  overlay={<Tooltip id={`cell-hex-${index}`}>{row.hex}</Tooltip>}
                >
                  <span className='cell-content cell-content--truncate'>{row.hex}</span>
                </OverlayTrigger>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  </div>
);

export default FileTable;
