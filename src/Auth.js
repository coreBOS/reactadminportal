import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as cbconn from 'corebos-ws-lib/WSClientm';
import { TABLE_AUTH, TABLE_DESCRIBE } from './local-db';
//import loginActions from './component/loginActions/loginActions';
import { loginAction } from './utils/Helpers';
import { getDataFromLocalDb } from './utils/Helpers';
import { Loading } from 'react-admin';

if (window.coreBOS === undefined) {
  window.coreBOS = {};
}

window.coreBOS.LoginEvent = new CustomEvent('coreBOSLoginEvent', {});


class Auth extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: false,
      code: '',
      isLoading: true,
      user: null,
    }
  }

  static propTypes = {
    user: PropTypes.object,
    validateToken: PropTypes.func,
  }
  

  componentDidMount() {
    this.authenticate();
  }

  async authenticate (){

    const authUser = await getDataFromLocalDb(TABLE_AUTH.tableName);
    const loggedInData = authUser?.logindata ?? null;
    if (loggedInData && loggedInData.userId) {
        this.setState({user: loggedInData});
        cbconn.setSession({sessionName: loggedInData.sessionName, userId: loggedInData.id});
        const describeData = await getDataFromLocalDb(TABLE_DESCRIBE.tableName);
        if(!describeData){
          //window.dispatchEvent(window.coreBOS.LoginEvent); 
          //loginActions();
          loginAction().then((describe) => {
            window.coreBOS.Describe = describe;
            this.setState({isLoading: false});
          })
        }else{
            window.coreBOS.Describe = describeData;
            this.setState({isLoading: false});
        }
    } else {
      window.location.href='#/login';
    }

  }

  render() {
    
    const { children } = this.props;
    
    return this.state.isLoading ? <Loading /> : children

  }

}


export default Auth;