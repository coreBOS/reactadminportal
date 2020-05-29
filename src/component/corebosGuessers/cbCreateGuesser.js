import React from 'react';
import { Create, SimpleForm } from 'react-admin';
import cbUtils from '../corebosUtils/corebosUtils';

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
		<SimpleForm>
			{
				fields.map((field, idx) => {
					return cbUtils.field2InputElement(field);
				})
			}
		</SimpleForm>
	</Create>
};
