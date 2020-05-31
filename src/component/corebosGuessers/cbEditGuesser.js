import React from 'react';
import { Edit, SimpleForm } from 'react-admin';
import cbUtils from '../corebosUtils/corebosUtils';

const validateEdit = async (values) => {
	const data = await cbconn.doValidateInformation(values.id, 'Accounts', values)
		.catch(function (error) {
			return error;
		});
	let errors = {};
	for (let [key, value] of Object.entries(data)) {
		errors[key] = value[0];
	}
	return errors;
};

export const cbEditGuesser = props => {
	let module = props.options.module;
	let fields = [];
	let label = '';
	if (window.coreBOS && window.coreBOS.Describe && window.coreBOS.Describe[module]) {
		label = window.coreBOS.Describe[module].label;
		fields = window.coreBOS.Describe[module].fields;
	}
	return <Edit
		{...props}
		title={label}
		>
		<SimpleForm validate={validateEdit}>
			{
				fields.map((field, idx) => {
					return cbUtils.field2InputElement(field);
				})
			}
		</SimpleForm>
	</Edit>
};
