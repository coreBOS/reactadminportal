import React, { useState, useEffect} from 'react';
import { Show, TabbedShowLayout, Tab } from 'react-admin';
import cbUtils from '../corebosUtils/corebosUtils';
import { getDataFromLocalDb } from '../../utils/Helpers';
import { TABLE_DESCRIBE } from '../../local-db';


export const CbShowTabGuesser = props => {
	let module = props.resource;
	const [describe, setDescribe] = useState({});
	const [blocks, setBlocks] = useState([]);
	const [label, setLabel] = useState('');

	useEffect(() => {
		getDataFromLocalDb(TABLE_DESCRIBE.tableName).then((result) => {
			setDescribe(result);
			let bfields = [];
			let mfields = result[module]?.fields;
			for (let f = 0; f<mfields.length; f++) {
				if (! mfields[f].block) {
					continue;
				}
				let bidx = bfields.findIndex((element) => element.id === mfields[f].block.blockid);
				if (bidx===-1) {
					bfields.push({
						id: mfields[f].block.blockid,
						sequence: mfields[f].block.blocksequence,
						label: mfields[f].block.blocklabel,
						name: mfields[f].block.blockname,
						fields: []
					});
					bidx = bfields.findIndex((element) => element.id === mfields[f].block.blockid);
				}
				bfields[bidx].fields.push(mfields[f]);
			}

			setBlocks(bfields);
			setLabel(result[module]?.label);
		});
	}, [module])


	return <Show
		{...props}
		title={label}
		>
		<TabbedShowLayout>
			{
				blocks.map((block, bidx) => {
					return <Tab key={'fbrefblk'+bidx} label={block.name}>
						{
							block.fields.map((field, idx) => {
								return cbUtils.field2DisplayElement(field, module, describe);
							})
						}
					</Tab>
				})
			}
		</TabbedShowLayout>
	</Show>
};
