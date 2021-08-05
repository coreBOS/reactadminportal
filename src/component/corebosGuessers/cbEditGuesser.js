import React, { useState, useEffect } from 'react';
import { Edit, SimpleForm } from 'react-admin';
import cbUtils from '../corebosUtils/corebosUtils';
//import * as cbconn from 'corebos-ws-lib/WSClientm';
import { QuickActions } from '../CbToolBar/QuickAction';
import { getDataFromLocalDb } from '../../utils/Helpers';
import { TABLE_DESCRIBE } from '../../local-db';


export const CbEditGuesser = props => {
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

	return (
		<Edit 
			actions={<QuickActions module={module} />} 
			title={label}
			{...props}
			>
			<SimpleForm>
				{
					fields.map((field, idx) => {
						return cbUtils.field2InputElement(field, module, {}, describe);
					})
				}
			</SimpleForm>
		</Edit>
	)
};
