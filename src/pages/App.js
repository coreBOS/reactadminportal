import React from 'react';
import { Admin, Resource } from 'react-admin';
import { cbListGuesser } from '../component/corebosGuessers/cbListGuesser';
import { cbShowGuesser } from '../component/corebosGuessers/cbShowGuesser';
import { cbShowTabGuesser } from '../component/corebosGuessers/cbShowTabGuesser';
import dataProvider from 'react-admin-corebos';
import loginActions from '../component/loginActions/loginActions';
import authProvider from '../component/authProvider/authProvider';

const App = () => (
	<Admin dataProvider={dataProvider} authProvider={authProvider} >
		<Resource name="users" options={{module:'Users'}} list={cbListGuesser} show={cbShowGuesser} />
		<Resource name="accounts" options={{module:'Accounts'}} list={cbListGuesser} show={cbShowTabGuesser} />
		<Resource name="contacts" options={{module:'Contacts'}} list={cbListGuesser} show={cbShowGuesser} />
	</Admin>
);

export default App;