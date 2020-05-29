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

const App = () => (
	<Admin dataProvider={dataProvider} authProvider={authProvider} >
		<Resource name="users" options={{module:'Users'}} list={cbListGuesser} show={cbShowGuesser} create={cbCreateGuesser} edit={cbEditGuesser} />
		<Resource name="accounts" options={{module:'Accounts'}} list={cbListGuesser} show={cbShowTabGuesser} create={cbCreateTabGuesser} edit={cbEditTabGuesser} />
		<Resource name="contacts" options={{module:'Contacts'}} list={cbListGuesser} show={cbShowGuesser} create={cbCreateGuesser} edit={cbEditGuesser} />
		<Resource name="leads" options={{module:'Leads'}} list={cbListGuesser} show={cbShowGuesser} create={cbCreateGuesser} edit={cbEditGuesser} />
	</Admin>
);

export default App;