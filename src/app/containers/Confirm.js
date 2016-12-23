/* eslint-disable camelcase */
import React, {Component, PropTypes} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AllActions from '../actions/index';
import axios from 'axios';
import {config} from '../constants/Config';
import {browserHistory, Link} from 'react-router';

class Confirm extends Component {

  renderRedirect() {
    const {login} = this.props;
    if(login.confirm.done) {
      return (
        <div className="text-center">
          <h3>Tu cuenta ha sido confirmada</h3>
          <p>Por favor <Link to={'/'}>inicia sesión</Link>.</p>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    const {login, actions, location} = this.props;
    if(!login.confirm.done) {
      actions.confirmAccount(location.query.token, location.query.user);
    }
    return (
      <div>
        <MuiThemeProvider>
          <div className="login">
            {login.confirm.loading ? <p>Confirmando cuenta...</p> : this.renderRedirect()}
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

Confirm.propTypes = {
  login: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    login: state.login
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AllActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Confirm);
