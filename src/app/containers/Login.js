/* eslint-disable camelcase */
import React, {Component, PropTypes} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LoginForm from './../components/LoginForm';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AllActions from '../actions/index';
import axios from 'axios';
import {config} from '../constants/Config';
import {browserHistory} from 'react-router';

class Login extends Component {

  handleSubmit = values => {
    this.props.actions.addServerResponseLogin({});
    axios.post(`${config.API_BASE}/login`, values)
      .then(data => {
        if (data.status === 201 || data.status === 200) {
          this.props.actions.toggleLogin(false);
          this.props.actions.setUSer(data.data);
          browserHistory.push('/dashboard');
        }
      })
      .catch(error => {
        if (error.response.data) {
          this.props.actions.addServerResponseLogin(error.response.data.errors);
        } else {
          this.props.actions.addServerResponseLogin(["Hubo un error al hacer una petición al servidor."]);
        }
      });
  }

  render() {
    const {login, actions} = this.props;

    return (
      <div>
        <MuiThemeProvider>
          <LoginForm
            onSubmit={this.handleSubmit}
            actions={actions}
            login={login}
            />
        </MuiThemeProvider>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    login: state.login,
    user: state.user
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
)(Login);
