import React from 'react'
import PropTypes from 'prop-types'

const getHeader = (row) => {
  return <tr>
    {Object.keys(row).map(key => <th>{key}</th> )}
  </tr>;
}
const getRows = (rows) => {
  return rows.map(row => {
        return <tr>
          {Object.values(row).map(val => <td>{val}</td> )}
        </tr>
      });
}
const Table = (props) => {
  let response = [];
  if (props.questionData.answer && props.questionData.answer.length>0) {
    response = props.questionData.answer;
    return <table>
        {getHeader(response[0])}
        {getRows(response)}
      </table>;
  } else {
    return null;
  }
}

Table.propTypes = {
  questionData: PropTypes.object,
}

export default Table