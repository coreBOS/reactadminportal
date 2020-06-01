import React from 'react';
import { Create, SimpleForm } from 'react-admin';
import cbUtils from '../corebosUtils/corebosUtils';
import * as cbconn from 'corebos-ws-lib/WSClientm';

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

export const cbCreateGuesser = props => {
	let module = props.options.module;
	let fields = [];
	let label = '';
	if (window.coreBOS && window.coreBOS.Describe && window.coreBOS.Describe[module]) {
		label = window.coreBOS.Describe[module].label;
		fields = window.coreBOS.Describe[module].fields;
	}
	return <Create
		{...props}
		title={label}
		>
		<SimpleForm validate={(values) => validateCreation(module, values)}>
			{
				fields.map((field, idx) => {
					return cbUtils.field2InputElement(field);
				})
			}
		</SimpleForm>
	</Create>
};
