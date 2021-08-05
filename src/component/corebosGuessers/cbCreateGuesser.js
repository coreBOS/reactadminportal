import React, { useState, useEffect} from 'react';
import { Create, SimpleForm } from 'react-admin';
import cbUtils from '../corebosUtils/corebosUtils';
import * as cbconn from 'corebos-ws-lib/WSClientm';
import { useLocation } from 'react-router-dom';
import { getDataFromLocalDb } from '../../utils/Helpers';
import { TABLE_DESCRIBE } from '../../local-db';

const validateCreation = async (module, values) => {
	const data = await cbconn.doValidateInformation('', module, values)
		.catch(function (error) {
			return error;
		});
	let errors = {};
	for (let [key, value] of Object.entries(data)) {
		errors[key] = value[0];
	}
	return errors;
};

export const CbCreateGuesser = props => {
	const module = props.resource;
	
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

	const defaultValue = {};
	const url = new URLSearchParams(useLocation().search);
	if(module === 'HelpDesk'){
		defaultValue.ticket_title = url.get('title')??'';
		defaultValue.description = url.get('description')??'';
	}
	
	return <Create
		{...props}
		title={label	}
		>
		<SimpleForm defaultValue={defaultValue} validate={(values) => validateCreation(module, values)}>
			{
				fields.map((field, idx) => {
					return cbUtils.field2InputElement(field, module, {}, describe);
				})
			}
		</SimpleForm>
	</Create>
};
