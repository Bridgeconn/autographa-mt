import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import TokenEdit from '../TokenEdit';
import { API } from '../../store/api';

const EditToken = ({ currentToken, row, projectId, setOccurance }) => {
  const [show, setShow] = useState(false);
  const [onChangeSelector, setOnChangeSelector] = useState('');

  useEffect(() => {
    // Add it to the Demo md file to show in the UI, need to get setter from props
    console.log(onChangeSelector);
  }, [onChangeSelector]);
  return (
    <div
      style={{ minHeight: 30, minWidth: 200 }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {currentToken === row[0] ? (
        <TokenEdit
          tokenDetail={{
            token: row[0],
            occurrences: row[1],
          }}
          projectId={projectId}
          setOccurance={setOccurance}
          onChangeSelector={setOnChangeSelector}
        />
      ) : (
        <div>{show && 'Click Row to edit token'}</div>
      )}
    </div>
  );
};
EditToken.propTypes = {
  currentToken: PropTypes.string.isRequired,
  projectId: PropTypes.number.isRequired,
  row: PropTypes.array,
  setOccurance: PropTypes.func,
};

export default function TokenPanel(props) {
  const { project, book, setToken, setOccurance } = props;
  const [tokens, setTokens] = useState([]);
  const [currentToken, setCurrentToken] = useState('');
  useEffect(() => {
    const projectId = project ? project.projectId : '';
    if (book && projectId) {
      API.get(
        `autographa/project/tokens?project_id=${projectId}&books=${book}&use_translation_memory=false`
      )
        .then(function (response) {
          setTokens(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setTokens([]);
    }
  }, [project, book]);
  const columns = [
    {
      name: 'token',
      label: 'Token',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'occurrences',
      options: {
        filter: false,
        sort: false,
        customBodyRender: function renderEditToken(value, row) {
          return project ? (
            <EditToken
              currentToken={currentToken}
              row={row.rowData}
              projectId={project ? project.projectId : ''}
              setOccurance={setOccurance}
            />
          ) : (
            ''
          );
        },
      },
    },
  ];
  const options = {
    download: false,
    viewColumns: false,
    selectableRows: 'none',
    textLabels: {
      body: {
        noMatch: 'Sorry, no data found',
      },
    },
    onRowClick: (rowData) => {
      setToken(rowData);
      setCurrentToken(rowData[0]);
    },
  };

  return (
    <div>
      <MUIDataTable
        title='Tokens'
        data={tokens}
        columns={columns}
        options={options}
      />
    </div>
  );
}
TokenPanel.propTypes = {
  setToken: PropTypes.func.isRequired,
  setOccurance: PropTypes.func.isRequired,
  book: PropTypes.string.isRequired,
  project: PropTypes.object,
};
