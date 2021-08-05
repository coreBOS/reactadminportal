import * as cbconn from 'corebos-ws-lib/WSClientm';
import { USER_AVATAR } from './constant';
import { 
    saveDataToLocalDB, 
    clearTable,
    TABLE_PERMISSIONS,
    TABLE_DESCRIBE,
	TABLE_LIST_VIEWS,
    TABLE_AUTH,
} from './local-db';
import { getDataFromLocalDb } from './utils/Helpers';

if (window.coreBOS===undefined) {
	window.coreBOS = {};
}
window.coreBOS.LoginEvent = new CustomEvent('coreBOSLoginEvent', { });

export const authProvider = {

	login: async ({ username, password }) => {
        await clearTable(TABLE_AUTH.tableName);
        return cbconn.doLogin(username, password, false).then(async (logindata) => {
			if (logindata !== false && cbconn.hasError(logindata) === false) {
				let coreboslogindata = logindata['result']
				coreboslogindata = {...coreboslogindata, userId: coreboslogindata.userId };
				cbconn.setSession({sessionName: coreboslogindata?.sessionName, userId: coreboslogindata?.userId});
				const res = await cbconn.doInvoke('getPortalUserInfo');
				const authData = { user: res, logindata: coreboslogindata, language:  res?.language};
				await saveDataToLocalDB(TABLE_AUTH.tableName, authData, false);
				await clearTable(TABLE_PERMISSIONS.tableName);
				await clearTable(TABLE_DESCRIBE.tableName);
				return Promise.resolve();      
			} else {
				return Promise.reject(cbconn.lastError());
			}
		}).catch(() => {
			return Promise.reject(cbconn.lastError());
		});

    },
    // called when the user clicks on the logout button
	logout: async () => {
		await clearTable(TABLE_AUTH.tableName);
        await clearTable(TABLE_PERMISSIONS.tableName);
        await clearTable(TABLE_DESCRIBE.tableName);
		await clearTable(TABLE_LIST_VIEWS.tableName);
        localStorage.clear();
        cbconn.doLogout();
        return Promise.resolve();
	},
	// called when the API returns an error
	checkError: () => Promise.resolve(),
	// called when the user navigates to a new location, to check for authentication
	checkAuth: async () => {
        const authData = await getDataFromLocalDb(TABLE_AUTH.tableName);
		const coreboslogindata = authData?.logindata ?? null;
		return coreboslogindata ? Promise.resolve() : Promise.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
	getPermissions: async () => {
        const permissions = await getDataFromLocalDb(TABLE_PERMISSIONS.tableName);
		return permissions;
    },
    getIdentity: async() => {
		let corebosUser = await getDataFromLocalDb(TABLE_AUTH.tableName);
		corebosUser = corebosUser && corebosUser ? corebosUser.logindata : null;

		if(corebosUser && corebosUser.user.id){
			return Promise.resolve({
				id: corebosUser?.id,
				fullName: corebosUser?.first_name +' '+ corebosUser?.last_name,
				avatar: USER_AVATAR
			});
        }

		return Promise.reject();
	}
};
