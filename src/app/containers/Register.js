/* eslint-disable camelcase */
import React, {Component, PropTypes} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RegisterForm from './../components/RegisterForm';
import axios from 'axios';
import {config} from '../constants/Config';
import {Link} from 'react-router';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as TodoActions from '../actions/index';

class Register extends Component {

  state = {
    succeeded: false,
    loading: false
  }

  handleSubmit = values => {
    this.props.actions.addServerResponse({});
    const valuesCopy = {
      ...values
    };
    valuesCopy.password_confirmation = valuesCopy.passwordConfirmation;
    // eslint-disable-next-line
    delete valuesCopy.passwordConfirmation;
    this.setState({loading: true});
    axios.post(`${config.API_BASE}/sign_up`, valuesCopy)
      .then(data => {
        if (data.status === 201) {
          this.setState({succeeded: true, loading: false});
        }
      })
      .catch(error => {
        this.setState({loading: false});
        if (error.response.data) {
          this.props.actions.addServerResponse(error.response.data.errors);
        }
      });
  }

  goLogin() {
    return (
      <div className="login">
        <h4>Gracias por registrarte</h4>
        <p>Hemos enviado un correo electrónico a tu bandeja de entrada con instrucciones para confirmar tu cuenta.</p>
        <p><Link to={'/'}>Regresar</Link></p>
      </div>
    );
  }

  render() {
    const {register, actions} = this.props;
    return (
      <div>
        <MuiThemeProvider>
          {!this.state.succeeded ? (
            <RegisterForm
              register={register}
              onSubmit={this.handleSubmit}
              actions={actions}
              loading={this.state.loading}
              />
            ) : this.goLogin()}
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
