import * as cbconn from 'corebos-ws-lib/WSClientm';
import config from '../../config';

if (window.coreBOS===undefined) {
	window.coreBOS = {};
}

window.addEventListener('coreBOSLoginEvent', function (e) {
	window.coreBOS.Describe = {};
	for(let mod = 0; mod < config.DescribeModules.length; mod++) {
		cbconn.doDescribe(config.DescribeModules[mod]).then((data) => {
			window.coreBOS.Describe[data.name] = data;
		});
	}
}, false);

export default () => { };
