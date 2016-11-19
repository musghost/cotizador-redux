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

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (values.password !== values.password_confirmation) {
    errors.password= 'Password must match';
  }

  return errors;
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => {
  
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
                errorText={this.props.errors.correo}
              />
            </div>
            <div>
               <Field
                name="password"
                component={TextField}
                floatingLabelText="Contraseña"
                fullWidth={true}
                type="password"
                errorText={this.props.errors.password}
              />
            </div>
            <div className="field-group">
               <Field
                name="password_confirmation"
                component={TextField}
                floatingLabelText="Confirmar contraseña"
                fullWidth={true}
                type="password"
                errorText={this.props.errors.password_confirmation}
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
  form: 'register',
  validate
})(RegisterForm);

export default RegisterForm;