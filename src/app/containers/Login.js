/* eslint-disable camelcase */
import React, {Component, PropTypes} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LoginForm from './../components/LoginForm';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as TodoActions from '../actions/index';
import axios from 'axios';
import {config} from '../constants/Config';

class Login extends Component {

  handleSubmit = values => {
    this.props.actions.addServerResponseLogin({});
    axios.post(`${config.API_BASE}/login`, values)
      .then(data => {
        if (data.status === 201) {
          this.props.actions.toggleLogin(false);
        }
      })
      .catch(error => {
        if (error.response.data) {
          this.props.actions.addServerResponseLogin(error.response.data.errors);
        }
      });
  }

  render() {
    const {todos, actions} = this.props;

    return (
      <div>
        <MuiThemeProvider>
          <LoginForm
            onSubmit={this.handleSubmit}
            actions={actions}
            />
        </MuiThemeProvider>
      </div>
    );
  }
}

Login.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    todos: state.todos
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
