/* eslint-disable camelcase */
import React, {Component, PropTypes} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RegisterForm from './../components/RegisterForm';
import axios from 'axios';
import {config} from '../constants/Config';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as TodoActions from '../actions/index';

class Register extends Component {

  handleSubmit = values => {
    this.props.actions.addServerResponse({});
    const valuesCopy = {
      ...values
    };
    valuesCopy.password_confirmation = valuesCopy.passwordConfirmation;
    // eslint-disable-next-line
    delete valuesCopy.passwordConfirmation;
    axios.post(`${config.API_BASE}/sign_up`, valuesCopy)
      .then(data => {
        if (data.status === 201) {
          this.props.actions.toggleRegister(false);
        }
      })
      .catch(error => {
        if (error.response.data) {
          this.props.actions.addServerResponse(error.response.data.errors);
        }
      });
  }

  render() {
    const {register, actions} = this.props;
    return (
      <div>
        <MuiThemeProvider>
          <RegisterForm
            register={register}
            onSubmit={this.handleSubmit}
            actions={actions}
            />
        </MuiThemeProvider>
      </div>
    );
  }
}

Register.propTypes = {
  register: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    register: state.register
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
)(Register);
