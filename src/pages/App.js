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
import PersonIcon from '@material-ui/icons/Person';
import ContactsIcon from '@material-ui/icons/Contacts';
import PlayForWorkIcon from '@material-ui/icons/PlayForWork';

const App = () => (
	<Admin dataProvider={dataProvider} authProvider={authProvider} >
		<Resource name="Users" list={cbListGuesser} show={cbShowGuesser} create={cbCreateGuesser} edit={cbEditGuesser} icon={PersonIcon} />
		<Resource name="Accounts" list={cbListGuesser} show={cbShowTabGuesser} create={cbCreateTabGuesser} edit={cbEditTabGuesser} icon={AccountBalanceIcon} />
		<Resource name="Contacts" list={cbListGuesser} show={cbShowGuesser} create={cbCreateGuesser} edit={cbEditGuesser} icon={ContactsIcon} />
		<Resource name="Leads" list={cbListGuesser} show={cbShowGuesser} create={cbCreateGuesser} edit={cbEditGuesser} icon={PlayForWorkIcon} />
	</Admin>
);

export default App;