import React from 'react';
import { List, Datagrid, EditButton, ShowButton } from 'react-admin';
import cbUtils from '../corebosUtils/corebosUtils';

function getFilterFields(module) {
	let ffields = [];
	if (window.coreBOS && window.coreBOS.Describe && window.coreBOS.Describe[module]) {
		ffields = window.coreBOS.Describe[module].filterFields.fields;
	}
	let fields = [];
	for (let f = 0; f<ffields.length; f++) {
		fields.push(window.coreBOS.Describe[module].fields.find((element) => element.name === ffields[f]));
	}
	return fields;
}

export const cbListGuesser = props => {
	let module = props.options.module;
	let fields = getFilterFields(module);
	let label = '';
	let pagesize = 25;
	if (window.coreBOS && window.coreBOS.Describe && window.coreBOS.Describe[module]) {
		label = window.coreBOS.Describe[module].label;
		pagesize = window.coreBOS.Describe[module].filterFields.pagesize;
	}
	if (pagesize > 10) {
		pagesize = 25;
	} else if (pagesize > 5) {
		pagesize = 10;
	} else {
		pagesize = 5;
	}
	return <List
		{...props}
		title={label}
		perPage={pagesize}
		>
		<Datagrid rowClick="show">
			{
				fields.map((field, idx) => {
					return cbUtils.field2DisplayElement(field);
				})
			}
			<EditButton />
			<ShowButton />
		</Datagrid>
	</List>
};
