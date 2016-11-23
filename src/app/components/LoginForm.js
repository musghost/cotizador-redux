/* eslint-disable no-class-assign */
import React, {Component, PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {reduxForm, Field} from 'redux-form';
import {TextField} from 'redux-form-material-ui';

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Requerido';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Correo inválido';
  }

  if (!values.password) {
    errors.password = 'Debe escribir una contraseña';
  }

  return errors;
};

class LoginForm extends Component {

  render() {
    const {handleSubmit} = this.props;
    return (
      <form className="login" onSubmit={handleSubmit}>
        <Paper zDepth={1}>
          <div className="login-wrapper">
            <h3>Ingresar</h3>
            <div>
              <Field
                name="email"
                component={TextField}
                floatingLabelText="Correo"
                fullWidth={Boolean(true)}
                />
            </div>
            <div className="field-group">
              <Field
                name="password"
                type="password"
                component={TextField}
                floatingLabelText="Contraseña"
                fullWidth={Boolean(true)}
                />
            </div>
            <div className="field-group">
              <RaisedButton
                label="Ingresar"
                type="submit"
                fullWidth={Boolean(true)}
                primary={Boolean(true)}
                />
            </div>
            <div className="field-group">
              <div><a href="#">Registrarse</a></div>
              <a href="#">Recuperar contraseña</a>
            </div>
          </div>
        </Paper>
      </form>
    );
  }
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

LoginForm = reduxForm({
  form: 'login',
  validate
})(LoginForm);

export default LoginForm;
