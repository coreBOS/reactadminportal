import * as cbconn from 'corebos-ws-lib/WSClientm';
import config from '../../config';

if (window.coreBOS===undefined) {
	window.coreBOS = {};
}

window.addEventListener('coreBOSLoginEvent', async function (e) {
	window.coreBOS.Describe = {};
	window.coreBOS.ListViews = {};
	const data = await cbconn.doDescribe(config.DescribeModules);
	let coreboscalls = [];
	for (var [mod, desc] of Object.entries(data)) {
		window.coreBOS.Describe[mod] = desc;
		coreboscalls.push(getViewsByModule(mod));
		coreboscalls.push(getAssignedUserList(mod));
	}
	await Promise.all(coreboscalls);
}, false);

function getViewsByModule(mod) {
	return cbconn.doInvoke('getViewsByModule', { module: mod }, 'GET').then((views) => {
		window.coreBOS.ListViews[mod] = views;
	});
}

function getAssignedUserList(mod) {
	return cbconn.doInvoke('getAssignedUserList', { module: mod }, 'GET').then((usrs) => {
		window.coreBOS.Describe[mod].userlist = JSON.parse(usrs);
	});
}

export default () => {
	window.coreBOS.Describe = {};
	window.coreBOS.ListViews = {};
	return cbconn.doDescribe(config.DescribeModules).then(async (data) => {
		let coreboscalls = [];
		for (var [mod, desc] of Object.entries(data)) {
			window.coreBOS.Describe[mod] = desc;
			coreboscalls.push(getViewsByModule(mod));
			coreboscalls.push(getAssignedUserList(mod));
		}
		await Promise.all(coreboscalls);
	});
};
