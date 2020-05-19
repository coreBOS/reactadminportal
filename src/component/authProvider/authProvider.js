import * as cbconn from 'corebos-ws-lib/WSClientm';

export default {
	// called when the user attempts to log in
	login: async ({ username, password }) => {
		let logdata = localStorage.getItem('coreboslogindata');
		if (logdata) {
			return Promise.resolve();
		} else {
			const apiUrl = 'http://localhost/coreBOSwork';
			cbconn.setURL(apiUrl);
			let logindata = await cbconn.doLogin(username, password, false);
			if (logindata !== false && cbconn.hasError(logindata) === false) {
				localStorage.setItem('coreboslogindata', JSON.stringify(logindata['result']));
				return Promise.resolve();
			} else {
				return Promise.reject(new Error('incorrect response: ' + cbconn.lastError()));
			}
		}
	},
	// called when the user clicks on the logout button
	logout: () => {
		localStorage.removeItem('coreboslogindata');
		cbconn.doLogout();
		return Promise.resolve();
	},
	// called when the API returns an error
	checkError: ({ status }) => {
		if (status === undefined) {
			return Promise.resolve();
		} else {
			localStorage.removeItem('coreboslogindata');
			return Promise.reject();
		}
	},
	// called when the user navigates to a new location, to check for authentication
	checkAuth: () => {
		return localStorage.getItem('coreboslogindata')
			? Promise.resolve()
			: Promise.reject();
	},
	// called when the user navigates to a new location, to check for permissions / roles
	getPermissions: () => Promise.resolve(),
};