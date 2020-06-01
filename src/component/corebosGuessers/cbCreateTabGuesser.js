import React from 'react';
import { Create, TabbedForm, FormTab } from 'react-admin';
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

function getFieldsByBlock(module) {
	let bfields = [];
	if (window.coreBOS && window.coreBOS.Describe && window.coreBOS.Describe[module]) {
		let mfields = window.coreBOS.Describe[module].fields;
		for (let f = 0; f<mfields.length; f++) {
			if (!mfields[f].block) {
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

export const cbCreateTabGuesser = props => {
	let module = props.options.module;
	let blocks = getFieldsByBlock(module);
	let label = '';
	if (window.coreBOS && window.coreBOS.Describe && window.coreBOS.Describe[module]) {
		label = window.coreBOS.Describe[module].label;
	}
	return <Create
		{...props}
		title={label}
		>
		<TabbedForm validate={(values) => validateCreation(module, values)}>
			{
				blocks.map((block, bidx) => {
					return <FormTab key={'fbrefblk'+bidx} label={block.name}>
						{
							block.fields.map((field, idx) => {
								return cbUtils.field2InputElement(field);
							})
						}
					</FormTab>
				})
			}
		</TabbedForm>
	</Create>
};
