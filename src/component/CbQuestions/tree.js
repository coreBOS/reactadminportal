import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import mermaid from 'mermaid'
import InlineSVG from 'svg-inline-react';

const Tree = (props) => {
  const[chartSvgSource, setChartSvgSource] = useState('')

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true })
    const renderChart = async () => {
      await mermaid.render('theGraph', props.questionData.answer, function(svgCode) {
        setChartSvgSource(svgCode)
      })
    };
    renderChart()
  }, [props])

  return (
    <React.Fragment>
      <InlineSVG src={chartSvgSource} />
    </React.Fragment>
  )
}

Tree.propTypes = {
  questionData: PropTypes.object
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})
export default connect(mapStateToProps, mapDispatchToProps)(Tree)