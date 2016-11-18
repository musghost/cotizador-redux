import React, {Component, PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from  'material-ui/Paper';

import { reduxForm, Field } from 'redux-form';

import {
  TextField,
} from 'redux-form-material-ui';

const style = {
  width: '400px'
}

class RegisterForm extends Component {

  render() {
    const {handleSubmit} = this.props;
    console.log(this.props);
    return (
      <form className="register" onSubmit={handleSubmit}>
        <Paper zDepth={1}>
          <div className="login-wrapper">
            <h3>Registro</h3>
            <div>
               <Field
                name="name"
                component={TextField}
                floatingLabelText="Nombre"
                fullWidth={true}
              />
            </div>
            <div>
               <Field
                name="email"
                component={TextField}
                floatingLabelText="Correo"
                fullWidth={true}
                errorText={this.props.error.correo}
              />
            </div>
            <div>
               <Field
                name="password"
                component={TextField}
                floatingLabelText="Contraseña"
                fullWidth={true}
                type="password"
                errorText={this.props.error.password}
              />
            </div>
            <div className="field-group">
               <Field
                name="password_confirmation"
                component={TextField}
                floatingLabelText="Confirmar contraseña"
                fullWidth={true}
                type="password"
                errorText={this.props.error.password_confirmation}
              />
            </div>
            <div className="form-errors">
              <ul>
                <li></li>
              </ul>
            </div>
            <div className="field-group">
              <RaisedButton
                label="Registrar"
                fullWidth={true}
                type="submit"
                primary={true} />
            </div>
          </div>
        </Paper>
      </form>
    );
  }
}

RegisterForm = reduxForm({
  form: 'register'
})(RegisterForm);

export default RegisterForm;