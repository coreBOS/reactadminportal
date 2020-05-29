import React from 'react';
import { Show, TabbedShowLayout, Tab } from 'react-admin';
import cbUtils from '../corebosUtils/corebosUtils';

function getFieldsByBlock(module) {
	let bfields = [];
	if (window.coreBOS && window.coreBOS.Describe && window.coreBOS.Describe[module]) {
		let mfields = window.coreBOS.Describe[module].fields;
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
	}
	return bfields;
}

export const cbShowTabGuesser = props => {
	let module = props.options.module;
	let blocks = getFieldsByBlock(module);
	let label = '';
	if (window.coreBOS && window.coreBOS.Describe && window.coreBOS.Describe[module]) {
		label = window.coreBOS.Describe[module].label;
	}
	return <Show
		{...props}
		title={label}
		>
		<TabbedShowLayout>
			{
				blocks.map((block, bidx) => {
					return <Tab label={block.name}>
						{
							block.fields.map((field, idx) => {
								return cbUtils.field2DisplayElement(field);
							})
						}
					</Tab>
				})
			}
		</TabbedShowLayout>
	</Show>
};
