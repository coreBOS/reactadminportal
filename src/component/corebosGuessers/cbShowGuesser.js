import React, { useState, useEffect } from 'react';
import { Show, SimpleShowLayout } from 'react-admin';
import cbUtils from '../corebosUtils/corebosUtils';
import { getDataFromLocalDb } from '../../utils/Helpers';
import { TABLE_DESCRIBE } from '../../local-db';

export const CbShowGuesser = props => {
	let module = props.resource;
	const [describe, setDescribe] = useState({});
	const [fields, setFields] = useState([]);
	const [label, setLabel] = useState('');


	useEffect(() => {
		getDataFromLocalDb(TABLE_DESCRIBE.tableName).then((result) => {
			setDescribe(result);
			setFields(result[module]?.fields);
			setLabel(result[module]?.label);
		});
	}, [module])


	return <Show
		{...props}
		title={label}
		>
		<SimpleShowLayout>
			{
				fields.map((field, idx) => {
					return cbUtils.field2DisplayElement(field, module, describe);
				})
			}
		</SimpleShowLayout>
	</Show>

};
