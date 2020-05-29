import React from 'react';
import { Edit, SimpleForm } from 'react-admin';
import cbUtils from '../corebosUtils/corebosUtils';

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
		<SimpleForm>
			{
				fields.map((field, idx) => {
					return cbUtils.field2InputElement(field);
				})
			}
		</SimpleForm>
	</Edit>
};
