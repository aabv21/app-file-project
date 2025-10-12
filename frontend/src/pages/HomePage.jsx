import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import FileFilter from '../components/FileFilter.jsx';
import FileTable from '../components/FileTable.jsx';
import useFilesData from '../hooks/useFilesData.js';

const HomePage = () => {
  const {
    fileList,
    rows,
    selectedFile,
    selectFile,
    loading,
    error,
    hasData,
    dataLoaded,
  } = useFilesData();

  const [showRenderWarning, setShowRenderWarning] = useState(false);

  useEffect(() => {
    if (window.location.hostname.endsWith('github.io')) {
      setShowRenderWarning(true);
    }
  }, []);

  return (
    <div className='min-vh-100 bg-light d-flex flex-column'>
      <header className='bg-danger text-white py-3 shadow-sm'>
        <Container fluid className='px-3 px-md-5'>
          <h1 className='h4 mb-0'>Echo Server App</h1>
        </Container>
      </header>
      <main className='py-4 flex-grow-1'>
        <Container fluid className='px-3 px-md-5'>
          {showRenderWarning && (
            <Alert variant='warning' className='shadow-sm mb-4'>
              The backend is hosted on Render and may go to sleep after long
              periods of inactivity. If the first request fails, wait a few
              seconds and refresh the page to wake it up.
            </Alert>
          )}

          <FileFilter
            fileList={fileList}
            selectedFile={selectedFile}
            onSelect={selectFile}
          />

          {loading ? (
            <div className='bg-white rounded shadow-sm py-5 text-center'>
              <Spinner
                animation='border'
                role='status'
                className='spinner-theme'
              />
              <p className='text-muted mt-3 mb-0'>Loading files...</p>
            </div>
          ) : error ? (
            <Alert variant='danger' className='shadow-sm'>
              {error}
            </Alert>
          ) : hasData ? (
            <FileTable rows={rows} />
          ) : dataLoaded ? (
            <Alert variant='info' className='shadow-sm'>
              No file data available.
            </Alert>
          ) : null}
        </Container>
      </main>
    </div>
  );
};

export default HomePage;
