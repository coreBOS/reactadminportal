import React, { useState, useEffect } from 'react';
import { List, Datagrid, Filter, SearchInput } from 'react-admin';
import cbUtils from '../corebosUtils/corebosUtils';
import { Chip } from '@material-ui/core';
import RowAction from '../RowAction';
import { getDataFromLocalDb } from '../../utils/Helpers';
import { TABLE_DESCRIBE, TABLE_LIST_VIEWS } from '../../local-db';


/* function getFilterFields(module) {
	let ffields = [];
	if (window.coreBOS && window.coreBOS.Describe && window.coreBOS.Describe[module]) {
		ffields = window.coreBOS.Describe[module].filterFields.fields;
	}
	let fields = [];
	for (let f = 0; f<ffields.length; f++) {
		fields.push(window.coreBOS.Describe[module].fields.find((element) => element.name === ffields[f]));
	}
	return fields;
} */

const QuickFilter = ({ label }) => {
    return <Chip label={label} />;
};


export const CbListGuesser = props => {
	let module = props.resource;
	const [describe, setDescribe] = useState({});
	//const [listViews, setListViews] = useState({});
	const [fields, setFields] = useState([]);
	const [quickFilters, setQuickFilters] = useState([]);
	const [label, setLabel] = useState('');
	const [pagesize, setPagesize] = useState(25);

	useEffect(() => {
		getDataFromLocalDb(TABLE_DESCRIBE.tableName).then((result) => {
			setDescribe(result);
			setLabel(result[module]?.label);

			let psize = result[module]?.filterFields?.pagesize;
			if (psize > 10) {
				setPagesize(25)
			} else if (psize > 5) {
				setPagesize(10)
			} else {
				setPagesize(5)
			}

			let ffields = result[module]?.filterFields?.fields;
			let modFields = [];
			for (let f = 0; f<ffields.length; f++) {
				modFields.push(result[module]?.fields.find((element) => element.name === ffields[f]));
			}
			setFields(modFields);
		});
		getDataFromLocalDb(TABLE_LIST_VIEWS.tableName).then((result) => {
			//setListViews(result);
			const modListViews = result[module]??null;
			const _quickFilters = [];
			if (modListViews) {
				for (let [key, value] of Object.entries(modListViews.filters)) {
					if (value.name==='All') {
						continue;
					}
					let q = value.advcriteriaEVQL;
					q += (q === '' ? '' : (value.stdcriteriaWQL === '' ? '' : ' and '))+value.stdcriteriaEVQL;
					_quickFilters.push(<QuickFilter key={'fbref'+key} source={'cbfiltersearch_'+key} label={value.name} defaultValue={q} />);
				}
				setQuickFilters(_quickFilters);
			}
		});
	}, [module])

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

	return <List
		{...props}
		title={label}
		perPage={pagesize}
		filters={<CBListFilter />}
		>
		<Datagrid>
			{
				fields.map((field) => {
					return cbUtils.field2DisplayElement(field, module, describe);
				})
			}
			<RowAction describe={describe} {...props} />
		</Datagrid>
	</List>

};
