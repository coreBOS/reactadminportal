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
	return cbconn.doDescribe(config.DescribeModules).then((data) => {
		for (var [mod, desc] of Object.entries(data)) {
			window.coreBOS.Describe[mod] = desc;
		}
	});
};
