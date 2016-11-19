import React, {Component, PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from  'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import RegisterForm from './../components/RegisterForm';
import axios from 'axios';
import qs from 'qs';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as TodoActions from '../actions/index';

import {
  TextField,
} from 'redux-form-material-ui'

const style = {
  width: '400px'
}

class Register extends Component {  

  handleSubmit = (values) => {
    axios.post('http://192.168.99.100:3000/api/v1/sign_up', values)
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        
      });
  }

  render() {
    const {register, handleSubmit} = this.props;
    return (
      <div>
        <MuiThemeProvider>
          <RegisterForm errors={register.errors} onSubmit={this.handleSubmit} />
        </MuiThemeProvider>
      </div>
    );
  }
}

Register.propTypes = {
  register: PropTypes.object.isRequired
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