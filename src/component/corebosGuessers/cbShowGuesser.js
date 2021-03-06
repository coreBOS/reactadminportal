import React from 'react';
import { Show, SimpleShowLayout } from 'react-admin';
import cbUtils from '../corebosUtils/corebosUtils';

export const cbShowGuesser = props => {
	let module = props.resource;
	let fields = [];
	let label = '';
	if (window.coreBOS && window.coreBOS.Describe && window.coreBOS.Describe[module]) {
		label = window.coreBOS.Describe[module].label;
		fields = window.coreBOS.Describe[module].fields;
	}
	return <Show
		{...props}
		title={label}
		>
		<SimpleShowLayout>
			{
				fields.map((field, idx) => {
					return cbUtils.field2DisplayElement(field, module);
				})
			}
		</SimpleShowLayout>
	</Show>
};
