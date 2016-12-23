/* eslint-disable no-class-assign */
import React, {Component, PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {reduxForm, Field} from 'redux-form';
import {TextField} from 'redux-form-material-ui';
import {Link} from 'react-router';

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
    const {handleSubmit, login} = this.props;
    let errorContainer;

    if (login.errors) {
      const errors = [];
      let i = 0;
      for (const error in login.errors) {
        if (login.errors.hasOwnProperty(error)) {
          errors.push(<li key={i}><strong>{error}</strong>: {login.errors[error]}</li>);
        }
        i++;
      }
      errorContainer = <ul className="form-errors">{errors}</ul>;
    }
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
            {errorContainer}
            <div className="field-group">
              <div><a href="#">Recuperar contraseña</a></div>
              <Link to={'/sign-up'}>Registrarse</Link>
            </div>
          </div>
        </Paper>
      </form>
    );
  }
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired
};

LoginForm = reduxForm({
  form: 'login',
  validate
})(LoginForm);

export default LoginForm;
