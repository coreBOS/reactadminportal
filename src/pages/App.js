import React from 'react';
import { Admin, Resource } from 'react-admin';
import { cbListGuesser } from '../component/corebosGuessers/cbListGuesser';
import dataProvider from 'react-admin-corebos';
import loginActions from '../component/loginActions/loginActions';
import authProvider from '../component/authProvider/authProvider';

const App = () => (
	<Admin dataProvider={dataProvider} authProvider={authProvider} >
		<Resource name="users" options={{module:'Users'}} list={cbListGuesser} />
		<Resource name="accounts" options={{module:'Accounts'}} list={cbListGuesser} />
		<Resource name="contacts" options={{module:'Contacts'}} list={cbListGuesser} />
	</Admin>
);

export default App;