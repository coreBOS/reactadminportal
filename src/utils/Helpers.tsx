import { useInput, BooleanInput, BooleanField } from 'react-admin';
import { COREBOS_DESCRIBE } from '../constant';
import { clearTable, getDataFromLocalDB, saveDataToLocalDB, TABLE_DESCRIBE, TABLE_PERMISSIONS, TABLE_LIST_VIEWS } from '../local-db';
import { getModDescribe, doInvoke } from './lib';

export const formatSearchObject = (field:any, searchText:any)  => {
    if (!searchText) {
        return;
    }
    let srch:any = {};
    srch[field] = searchText;
    return srch;
}

export const FormattedBooleanInput = (props:any) => {
    let input = useInput(props);
    const isChecked = {checked: false};

    if (Number(input.input.value)) {
        isChecked.checked = true;
    }
    return (<BooleanInput {...props} options={isChecked}/>);
};

export const FormattedBooleanField = (props:any) => {
    props.record[props.source] = (props.record[props.source] === '1');

    return (
        <div>
            <div style={{width: '100%'}}>
                <label className="MuiFormLabel-root">{props.label}</label>
            </div>
            <BooleanField {...props} />
        </div>
    );
};

export const getDataFromLocalDb = async (tableName: string) => {
	const data = await getDataFromLocalDB(tableName);
	if(tableName === 'permissions' ){
		return data && data.length ? data : null;
	}
	return data && data[0] ? data[0] : null;
}

export const loginAction = async () => {
    //await clearTable(TABLE_AUTH.tableName);
	await clearTable(TABLE_PERMISSIONS.tableName);
	await clearTable(TABLE_DESCRIBE.tableName);
    await clearTable(TABLE_LIST_VIEWS.tableName);
    //window.dispatchEvent(window.coreBOS.LoginEvent); 
    //loginActions();
    let permissions: any[] = [];
    let Describe: any = {};
    let ListViews: any = {};

    return getModDescribe(COREBOS_DESCRIBE.join(',')).then((descinfo: any) => {
            for (let key in descinfo) {
                Describe[key] = descinfo[key];
                let modulePermissions = {
                    module: key,
                    permissions: {
                        create: descinfo[key].createable,
                        delete: descinfo[key].deleteable,
                        update: descinfo[key].updateable,
                        list: descinfo[key].retrieveable,
                    }
                };
                permissions.push(modulePermissions);
            }
            return permissions;
    }).then(async (result: any) => {
        await saveDataToLocalDB(TABLE_PERMISSIONS.tableName, result, true);
        let AssignedUserList = [];
        let ViewsByModule: any[] = [];
        for (let mod = 0; mod < COREBOS_DESCRIBE.length; mod++) {
            if (Describe[COREBOS_DESCRIBE[mod]]) {
                AssignedUserList.push(
                    doInvoke('getAssignedUserList', { module: COREBOS_DESCRIBE[mod] }, 'GET').then((users: any) => {
                        Describe[COREBOS_DESCRIBE[mod]].userlist = JSON.parse(users);
                    })
                );
                ViewsByModule.push(
                    doInvoke("getViewsByModule", { module: COREBOS_DESCRIBE[mod] }, "GET").then((data) => {
                        ListViews[COREBOS_DESCRIBE[mod]] = data;
                    })
                );
            }
        }

        return Promise.all(AssignedUserList).then( () => {
            return saveDataToLocalDB(TABLE_DESCRIBE.tableName, Describe, false);
        }).then(async () => {
            await Promise.all(ViewsByModule);
            return await saveDataToLocalDB(TABLE_LIST_VIEWS.tableName, ListViews, false);
        }).then(() => {
            return Promise.resolve(Describe);
        })
    });
}