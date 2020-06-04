import React, { useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import { cbShowGuesser } from '../corebosGuessers/cbShowGuesser';
import * as cbconn from 'corebos-ws-lib/WSClientm'
import CbQuestion from '../CbQuestions/index'

const Question = ({questionid}) => {
  const [questionData, setQuestionData] = useState({})

  useEffect(() => {
    const fetchQuestionAnswer = async () => {
      cbconn.doInvoke('cbQuestionAnswer', {qid: questionid, param: []}, 'GET')
        .then(data => {
          setQuestionData(data)
        })
    };
    fetchQuestionAnswer();
  }, [questionid])

  return(
    <div style={{ width: 500, margin: '1em' }}>
      <h1>{questionData.title}</h1>
      <CbQuestion questionData={questionData} />
    </div>
  )
}

const Aside = () => (
	<div>
    <div style={{ width: 500, margin: '1em' }}>
        <Typography variant="h3">Aside Block Title</Typography>
        <Typography variant="body2">
            Aside block contents
        </Typography>
    </div>
	<Question questionid='48x44586' />
	<Question questionid='48x44588' />
	<Question questionid='48x44587' />
	<Question questionid='48x44589' />
	</div>
);

export const cbProject = props => {
	return cbShowGuesser({...props, ...{aside: <Aside />}});
};
