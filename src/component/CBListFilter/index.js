import React from "react";
import { Filter, DateInput, TextInput, SelectInput, useInput, BooleanInput, ReferenceInput, AutocompleteInput } from 'react-admin';
import cbUtils from '../corebosUtils/corebosUtils';

const FormattedBooleanInput = (props) => {
    let input = useInput(props);
    const isChecked = {checked: false};

    if (Number(input.input.value)) {
        isChecked.checked = true;
    }
    return (<BooleanInput {...props} options={isChecked}/>);
};

const formatSearchObject = (field, searchText) => {
    if (!searchText) {
        return;
    }
    let srch = {};
    srch[field] = searchText;
    return srch;
}

export const CBListFilter = (props) => {
    return (
        <Filter {...props} >
            { 
                props.fields.map((field, i) => {
                    if(typeof field === 'object'){
                        switch (field.uitype) {
                            case '5': //date type
                                return (props && props.disabledfield && props.disabledfield === field.name) ? <DateInput key={i} source={field.name} label={field.label} alwaysOn disabled parse={cbUtils.dateParser}/> : <DateInput key={i} source={field.name} label={field.label} parse={cbUtils.dateParser}/>;
                            case '50': //date type
                                return (props && props.disabledfield && props.disabledfield === field.name) ? <DateInput key={i} source={field.name} label={field.label} alwaysOn disabled parse={cbUtils.dateParser}/> : <DateInput key={i} source={field.name} label={field.label} parse={cbUtils.dateParser}/>;
                            case '10': //Module Relation

                                if (field.type.refersTo.length === 0) {
                                    return <></>
                                }
                                if (!props.describe || !props.describe[field.type.refersTo[0]]) {
                                    return <></>
                                }
                                const refmod = props?.describe[field.type.refersTo[0]]??{};
                                let labelFields = refmod.labelFields;

            
                                if (labelFields && labelFields.indexOf(',') > -1) {
                                    labelFields = labelFields.split(',')[0];
                                }

                                
                                return (props && props.disabledfield && props.disabledfield === field.name) ? 
                                    <ReferenceInput
                                        disabled
                                        variant="outlined"
                                        key={field.name}
                                        label={field.label}
                                        source={field.name}
                                        reference={refmod.name}
                                        filterToQuery={searchText =>
                                            formatSearchObject(labelFields, searchText)
                                        }>
                                        <AutocompleteInput
                                            variant="outlined"
                                            key={'ref' + field.name}
                                            optionText={labelFields}
                                        />
                                    </ReferenceInput> :

                                        <ReferenceInput
                                        variant="outlined"
                                        key={field.name}
                                        label={field.label}
                                        source={field.name}
                                        reference={refmod.name}
                                        filterToQuery={searchText =>
                                            formatSearchObject(labelFields, searchText)
                                        }>
                                        <AutocompleteInput
                                            variant="outlined"
                                            key={'ref' + field.name}
                                            optionText={labelFields}
                                        />
                                        </ReferenceInput> 
                                
                            /* case '50': //datetime type
                                return (props && props.disabledfield && props.disabledfield === field.name) ? <DateTimeInput key={i} source={field.name} label={field.label} alwaysOn disabled parse={cbUtils.dateParser} /> : <DateTimeInput key={i} source={field.name} label={field.label} parse={cbUtils.dateParser} />; */
                            case '15': //Picklist
                                return (props && props.disabledfield && props.disabledfield === field.name) ? <TextInput key={i} source={field.name} label={field.label} alwaysOn disabled /> : <SelectInput key={i} source={field.name} label={field.label} choices={field.type.picklistValues} optionText="value" optionValue="label" defaultValue={field.defaultValue}/>;
                            case '56': //Checkbox
                                return (props && props.disabledfield && props.disabledfield === field.name) ? <FormattedBooleanInput key={i} source={field.name} defaultValue={field.defaultValue} label={field.label} alwaysOn disabled /> : <FormattedBooleanInput key={i} source={field.name} label={field.label} />;
                            default:
                                return (props && props.disabledfield && props.disabledfield === field.name) ? <TextInput key={i} source={field.name} label={field.label} alwaysOn disabled /> : <TextInput key={i} source={field.name} label={field.label} />;
                        }
                    }else{
                        return (props && props.disabledfield && props.disabledfield === field) ? <TextInput key={i} source={field} label={field.label} alwaysOn disabled /> : <TextInput key={i} source={field} label={field.label} />;
                    }
                })
            }
        </Filter>
    );
}