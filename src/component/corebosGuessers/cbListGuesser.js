import React from 'react';
import { List, Datagrid, EditButton, ShowButton, Filter, SearchInput } from 'react-admin';
import cbUtils from '../corebosUtils/corebosUtils';
import { Chip } from '@material-ui/core';

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

const QuickFilter = ({ label }) => {
    return <Chip label={label} />;
};

export const cbListGuesser = props => {
	let module = props.options.module;
	let quickFilters = [];
	if (window.coreBOS && window.coreBOS.ListViews && window.coreBOS.ListViews[module]) {
		for (let [key, value] of Object.entries(window.coreBOS.ListViews[module].filters)) {
			if (value.name==='All') {
				continue;
			}
			let q = value.advcriteriaEVQL;
			q += (q === '' ? '' : (value.stdcriteriaWQL === '' ? '' : ' and '))+value.stdcriteriaEVQL;
			quickFilters.push(<QuickFilter key={'fbref'+key} source={'cbfiltersearch_'+key} label={value.name} defaultValue={q} />);
		}
	}
	const CBListFilter = props => (
		<Filter {...props}>
			<SearchInput source={'cblistsearch_'+module} alwaysOn />
			{
				quickFilters.map((field, idx) => {
					return field;
				})
			}
		</Filter>
	);
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
		filters={<CBListFilter />}
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
