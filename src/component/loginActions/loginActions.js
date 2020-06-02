import * as cbconn from 'corebos-ws-lib/WSClientm';
import config from '../../config';

if (window.coreBOS===undefined) {
	window.coreBOS = {};
}

window.addEventListener('coreBOSLoginEvent', function (e) {
	window.coreBOS.Describe = {};
	cbconn.doDescribe(config.DescribeModules).then((data) => {
		for (var [mod, desc] of Object.entries(data)) {
			window.coreBOS.Describe[mod] = desc;
		}
	});
}, false);

export default () => {
	window.coreBOS.Describe = {};
	window.coreBOS.ListViews = {};
	return cbconn.doDescribe(config.DescribeModules).then(async (data) => {
		for (var [mod, desc] of Object.entries(data)) {
			window.coreBOS.Describe[mod] = desc;
			await cbconn.doInvoke('getViewsByModule', { module: mod }, 'GET').then((data, ) => {
				window.coreBOS.ListViews[mod] = data;
			});
		}
	});
};
