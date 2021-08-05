import React, { useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import { CbShowGuesser } from '../corebosGuessers/cbShowGuesser';
import * as cbconn from 'corebos-ws-lib/WSClientm'
import CbQuestion from '../CbQuestions/index';
import { MenuItemLink } from "react-admin";
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

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

const Aside = ({ record }) => (
	<div>
    <MenuItemLink
        to={`/ProjectTask?filter=${JSON.stringify({ projectid: record?.id})}`}
        primaryText={'View Tasks'}
        leftIcon={<AssignmentTurnedInIcon />}
      />
    <div style={{ width: 500, margin: '1em' }}>
        <Typography variant="h3">Aside Block Title</Typography>
        <Typography variant="body2">
            Aside block contents
        </Typography>
    </div>
	<Question questionid='52x117470' />
	<Question questionid='52x117471' />
	<Question questionid='52x117472' />
	<Question questionid='52x117473' />
	</div>
);

export const cbProject = props => {
	return CbShowGuesser({...props, ...{aside: <Aside />}});
};
