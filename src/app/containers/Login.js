import React, {Component, PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from  'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as TodoActions from '../actions/index';
import { reduxForm, Field } from 'redux-form';

import {
  TextField,
} from 'redux-form-material-ui'

const style = {
  width: '400px'
}

function submit(values) {
  console.log(values);
}

class Login extends Component {  

  handleSubmit = (e) => {
    //TodoActions.doLogin()
    e.preventDefault();
    console.log(e);
  }

  render() {
    const {todos, actions, handleSubmit} = this.props;
    return (
      <div>
        <MuiThemeProvider>
          <form className="login" onSubmit={handleSubmit(submit)}>
            <Paper zDepth={1}>
              <div className="login-wrapper">
                <h3>Ingresar</h3>
                <div>
                   <Field name="username" component={TextField} hintText="Street"/>
                </div>
                <div>
                  <TextField 
                    fullWidth={true}
                    type="email"
                    floatingLabelText="Correo" />
                </div>
                <div className="field-group">
                  <TextField 
                    fullWidth={true}
                    type="password"
                    floatingLabelText="Contraseña" />
                </div>
                <div className="field-group">
                  <RaisedButton
                    label="Ingresar"
                    fullWidth={true}
                    type="submit"
                    primary={true} />
                </div>
                <div className="field-group">
                  <div><a href="#">Registrarse</a></div>
                  <a href="#">Recuperar contraseña</a>
                </div>
              </div>
            </Paper>
          </form>
        </MuiThemeProvider>
      </div>
    );
  }
}

Login.propTypes = {
  todos: PropTypes.object.isRequired,
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

Login = reduxForm({
  form: 'login'
})(Login)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);