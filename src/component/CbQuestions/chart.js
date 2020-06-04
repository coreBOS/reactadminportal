import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types"
import {Pie} from 'react-chartjs-2';
import randomColor from "randomcolor"

const Chart = (props) => {

  const[chartData, setChartData] = useState({
    data : {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: []
      }]
    }
  });

  useEffect(() => {
    const getGraphData = async () => {
      let chartProperties = JSON.parse(props.questionData.properties);
      let chartLabels = [];
      let chartDataSets = [];
      let chartBackgroundColors = [];
      if(props.questionData.answer !== undefined )
        // eslint-disable-next-line array-callback-return
        props.questionData.answer.map((answer, index) => {
          chartLabels.push(answer[chartProperties.key_label]);
          chartDataSets.push(answer[chartProperties.key_value])
          chartBackgroundColors.push(randomColor())
        }
      )
      setChartData({...chartData, labels: chartLabels, datasets: [{data: chartDataSets, backgroundColor: chartBackgroundColors}]})
    };
    getGraphData()
  },[])

    return (
      <React.Fragment>
        <Pie data={chartData} width={400} height={200} options={{ maintainAspectRatio: false }} />
      </React.Fragment>
    );
};

Chart.prototypes  = {
  questionData: PropTypes.object
}

export default Chart;