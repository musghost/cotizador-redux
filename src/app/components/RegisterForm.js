/* eslint-disable no-class-assign */
import React, {Component, PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {Link} from 'react-router';
import {reduxForm, Field} from 'redux-form';
import {TextField} from 'redux-form-material-ui';

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Requerido';
  }

  if (!values.email) {
    errors.email = 'Requerido';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Correo inválido';
  }

  if (!values.password) {
    errors.password = 'Debe escribir una contraseña';
  } else if (values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation = 'El password debe coincidir';
  }

  return errors;
};

const renderField = field => {
  return (
    <div>
      <TextField
        fullWidth={Boolean(true)}
        {...field}
        />
    </div>
  );
};

class RegisterForm extends Component {

  render() {
    const {handleSubmit, register} = this.props;
    let errorContainer;

    if (register.errors) {
      const errors = [];
      let i = 0;
      for (const error in register.errors) {
        if (register.errors.hasOwnProperty(error)) {
          errors.push(<li key={i}><strong>{error}</strong>: {register.errors[error]}</li>);
        }
        i++;
      }
      errorContainer = <ul className="form-errors">{errors}</ul>;
    }
    return (
      <form className="register" onSubmit={handleSubmit}>
        {register.register ? (
          <Paper zDepth={1}>
            <div className="login-wrapper">
              <h3>Registro</h3>
              <div>
                <Field
                  name="name"
                  component={renderField}
                  floatingLabelText="Nombre"
                  type="text"
                  />
              </div>
              <div>
                <Field
                  name="email"
                  component={renderField}
                  floatingLabelText="Correo"
                  />
              </div>
              <div>
                <Field
                  name="password"
                  component={renderField}
                  floatingLabelText="Contraseña"
                  type="password"
                  />
              </div>
              <div className="field-group">
                <Field
                  name="passwordConfirmation"
                  component={renderField}
                  floatingLabelText="Confirmar contraseña"
                  type="password"
                  />
              </div>
              {errorContainer}
              <div className="field-group">
                <RaisedButton
                  label="Registrar"
                  type="submit"
                  primary={Boolean(true)}
                  disabled={this.props.loading}
                  />
                {this.props.loading ? <span>Registrando usuario...</span> : null}
              </div>
            </div>
          </Paper>) : (
          <Paper zDepth={1}>
            <div className="login-wrapper">
              <h3>Gracias por registrarte</h3>
              <p>Ahora puedes <Link to={'/'}>iniciar sesión</Link> con tus los datos que proporcionaste.</p>
            </div>
          </Paper>)}
      </form>
    );
  }
}

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  register: PropTypes.object.isRequired,
  loading: PropTypes.bool
};

RegisterForm = reduxForm({
  form: 'register',
  validate
})(RegisterForm);

export default RegisterForm;
