import React from 'react';
import { Admin, Resource, defaultTheme } from 'react-admin';
import {
    unstable_createMuiStrictModeTheme,
    createMuiTheme,
} from '@material-ui/core/styles';

import dataProvider from 'react-admin-corebos';

import Login from './auth/Login';
import { authProvider } from './authProvider';
import CustomLayout from './layout/Layout';
import i18nProvider from './component/i18n/i18nProvider';
import { CbListGuesser } from './component/corebosGuessers/cbListGuesser';
import { CbShowGuesser } from './component/corebosGuessers/cbShowGuesser';
import { CbShowTabGuesser } from './component/corebosGuessers/cbShowTabGuesser';
import { CbEditGuesser } from './component/corebosGuessers/cbEditGuesser';
import { CbEditTabGuesser } from './component/corebosGuessers/cbEditTabGuesser';
import { CbCreateGuesser } from './component/corebosGuessers/cbCreateGuesser';
import { CbCreateTabGuesser } from './component/corebosGuessers/cbCreateTabGuesser';
import { cbProject } from './component/cbProject/cbProject';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import ContactsIcon from '@material-ui/icons/Contacts';
import PlayForWorkIcon from '@material-ui/icons/PlayForWork';

import Dashboard from './dashboard/Dashboard';
import CreateIcon from '@material-ui/icons/Create';
import * as cbconn from 'corebos-ws-lib/WSClientm';
import { COREBOS_URL } from './constant';

if (window.coreBOS === undefined) {
    window.coreBOS = {};
}

const theme =
    process.env.NODE_ENV !== 'production'
        ? unstable_createMuiStrictModeTheme(defaultTheme)
        : createMuiTheme(defaultTheme);

const App = () => {

	window.addEventListener('coreBOSSessionExpiredEvent', function (e) {
		authProvider.logout().then(() => {
			window.location.reload();
		});
	}, false);
	
	cbconn.setURL(COREBOS_URL);

	return (
		
		<Admin
			loginPage={Login}
			dataProvider={dataProvider}
			authProvider={authProvider}
			i18nProvider={i18nProvider} 
			layout={CustomLayout}
			dashboard={Dashboard}
			theme={theme}
		>
		
			{permissions => [

				<Resource
					name="Accounts"
					list={CbListGuesser}
					show={CbShowTabGuesser}
					create={CbCreateTabGuesser}
					edit={CbEditTabGuesser}
					icon={AccountBalanceIcon}
					options={{ label: 'Accounts', show: true }}
				/>,
				<Resource
					name="Contacts"
					list={CbListGuesser}
					show={CbShowGuesser}
					create={CbCreateGuesser}
					edit={CbEditGuesser}
					icon={ContactsIcon}
					options={{ label: 'Contacts', show: true }}
				/>,
				<Resource
					name="Project"
					list={CbListGuesser}
					show={cbProject}
					create={CbCreateGuesser}
					edit={CbEditGuesser}
					icon={AccountTreeIcon}
					options={{ label: 'Projects', show: true }}
				/>,
				<Resource
					name="Leads"
					icon={PlayForWorkIcon}
				/>,
				<Resource
					name="ServiceContracts"
					icon={CreateIcon}
					options={{ label: 'Service Contracts', show: false }}
				/>
			]
		}
	</Admin>
	);
}

export default App;