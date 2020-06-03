import React from 'react';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import ContactsIcon from '@material-ui/icons/Contacts';
import PlayForWorkIcon from '@material-ui/icons/PlayForWork';

export default {
  AppName: "coreBOS Portal",
  Server: {
    url: 'http://localhost/coreBOSTest',
  },
  DescribeModules: [
    'Accounts', 'Contacts', 'Leads', 'Project'
  ],
  ModuleIcons: {
    'Accounts': <AccountBalanceIcon />,
    'Contacts': <ContactsIcon />,
    'Leads': <PlayForWorkIcon />,
    'Project': <AccountTreeIcon />,
  },
}
