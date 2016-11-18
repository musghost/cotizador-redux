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
                fullWidth={true}
              />
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
    );
  }
}

LoginForm = reduxForm({
  form: 'login'
})(LoginForm);

export default LoginForm;