import React, { useState, useEffect } from "react";
//import * as cbconn from 'corebos-ws-lib/WSClientm';
import { UserMenu, MenuItemLink } from "react-admin";
import PersonIcon from '@material-ui/icons/Person';
import { getDataFromLocalDb } from '../utils/Helpers';
import { TABLE_AUTH } from '../local-db';

const CustomUserMenu = (props) => {

  //const [loginData, setLoginData] = useState({});
  const [user, setUser] = useState({});
    
  useEffect(() => {
      getDataFromLocalDb(TABLE_AUTH.tableName).then((result) => {
        setUser(result?.user??{});
      });
  }, []);

  return (
    <UserMenu key={'customUserProfile'} {...props}>
      <MenuItemLink
        to={`/Contacts/${user?.id}/show`}
        primaryText={'My Profile'}
        sidebarIsOpen={false}
        leftIcon={<PersonIcon />}
      />
    </UserMenu>
  );
};

export default CustomUserMenu;