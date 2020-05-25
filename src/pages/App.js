import React from 'react';
import config from '../config';
import { Admin, Resource } from 'react-admin';
import { cbListGuesser } from '../component/corebosGuessers/cbListGuesser';
import dataProvider from 'react-admin-corebos';
import authProvider from '../component/authProvider/authProvider';
import loginActions from '../component/loginActions/loginActions';

const App = () => (
	<Admin dataProvider={dataProvider} authProvider={authProvider} >
		<Resource name="users" list={cbListGuesser} />
		<Resource name="accounts" list={cbListGuesser} />
	</Admin>
);

export default App;