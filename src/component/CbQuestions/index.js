import React from 'react'
import Table from './table'
import Chart from './chart'
import Tree from './tree'
import Number from './number'

const CbQuestion = (props) => {

  return(
    <React.Fragment>
      {props.questionData.type === 'Table' && (
        <Table questionData={props.questionData}/>
      )}
      {props.questionData.type === 'Pie' && (
        <Chart questionData={props.questionData} />
      )}
      {props.questionData.type === 'Mermaid' && (
        <Tree questionData={props.questionData}/>
      )}
      {props.questionData.type === 'Number' && (
        <Number questionData={props.questionData}/>
      )}
    </React.Fragment>
  )

}

export default CbQuestion;