import React from 'react';
import { List, Datagrid, TextField, EmailField } from 'react-admin';

export const cbListGuesser = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="first_name" />
            <TextField source="user_name" />
            <EmailField source="email1" />
            <TextField source="phone_work" />
            <TextField source="website" />
        </Datagrid>
    </List>
);
