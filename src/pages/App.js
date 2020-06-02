import React from 'react';
import { Admin, Resource } from 'react-admin';
import { cbListGuesser } from '../component/corebosGuessers/cbListGuesser';
import { cbShowGuesser } from '../component/corebosGuessers/cbShowGuesser';
import { cbShowTabGuesser } from '../component/corebosGuessers/cbShowTabGuesser';
import { cbEditGuesser } from '../component/corebosGuessers/cbEditGuesser';
import { cbEditTabGuesser } from '../component/corebosGuessers/cbEditTabGuesser';
import { cbCreateGuesser } from '../component/corebosGuessers/cbCreateGuesser';
import { cbCreateTabGuesser } from '../component/corebosGuessers/cbCreateTabGuesser';
import dataProvider from 'react-admin-corebos';
import loginActions from '../component/loginActions/loginActions';
import authProvider from '../component/authProvider/authProvider';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import ContactsIcon from '@material-ui/icons/Contacts';
import PlayForWorkIcon from '@material-ui/icons/PlayForWork';

const App = () => (
	<Admin dataProvider={dataProvider} authProvider={authProvider} >
		{permissions => [
		<Resource
			name="Accounts"
			list={window.coreBOS.Describe.Accounts && window.coreBOS.Describe.Accounts.retrieveable ? cbListGuesser : null}
			show={window.coreBOS.Describe.Accounts && window.coreBOS.Describe.Accounts.retrieveable ? cbShowTabGuesser : null}
			create={window.coreBOS.Describe.Accounts && window.coreBOS.Describe.Accounts.createable ? cbCreateTabGuesser : null}
			edit={window.coreBOS.Describe.Accounts && window.coreBOS.Describe.Accounts.updateable ? cbEditTabGuesser : null}
			icon={AccountBalanceIcon}
		/>,
		<Resource
			name="Contacts"
			list={window.coreBOS.Describe.Contacts && window.coreBOS.Describe.Contacts.retrieveable ? cbListGuesser : null}
			show={window.coreBOS.Describe.Contacts && window.coreBOS.Describe.Contacts.retrieveable ? cbShowGuesser : null}
			create={window.coreBOS.Describe.Contacts && window.coreBOS.Describe.Contacts.createable ? cbCreateGuesser : null}
			edit={window.coreBOS.Describe.Contacts && window.coreBOS.Describe.Contacts.updateable ? cbEditGuesser : null}
			icon={ContactsIcon}
		/>,
		<Resource
			name="Project"
			list={window.coreBOS.Describe.Project && window.coreBOS.Describe.Project.retrieveable ? cbListGuesser : null}
			show={window.coreBOS.Describe.Project && window.coreBOS.Describe.Project.retrieveable ? cbShowGuesser : null}
			create={window.coreBOS.Describe.Project && window.coreBOS.Describe.Project.createable ? cbCreateGuesser : null}
			edit={window.coreBOS.Describe.Project && window.coreBOS.Describe.Project.updateable ? cbEditGuesser : null}
			icon={AccountTreeIcon}
		/>,
		<Resource
			name="Leads"
			icon={PlayForWorkIcon}
		/>
		]
	}
	</Admin>
);

export default App;