import React from 'react'
import PropTypes from 'prop-types'

const Number = (props) => {

  return (
    <span>
      {props.questionData.answer !== undefined && props.questionData.answer.map((answer, index) => answer.number )}
    </span>
  )
}

Number.propTypes = {
  questionData: PropTypes.object,
}

export default Number