import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {TextField} from 'redux-form-material-ui';

class NewQuoteModal extends Component {

  render() {
    const {client, project, version} = this.props.quote;
    const {handleSubmit} = this.props;

    return (
      <div>
        <Dialog
          title="Crear una nueva cotización"
          modal={false}
          open={true}
          onRequestClose={this.handleClose}
          >
          <form
            ref={(form) => {this.createForm = form;}}
            onSubmit={handleSubmit}>
            <div>
              <Field
                name="client"
                component={TextField}
                floatingLabelText="Cliente"
                />
            </div>
            <div>
              <Field
                name="project"
                component={TextField}
                floatingLabelText="Proyecto"
                />
            </div>
            <div>
              <Field
                name="version"
                component={TextField}
                floatingLabelText="Versión"
                />
              <small>{version}</small>
            </div>
            <div>
              <Field
                name="expirationDate"
                component={TextField}
                floatingLabelText="Fecha de expiración"
                />
            </div>
            <div>
              <Field
                name="observations"
                component={TextField}
                floatingLabelText="Observaciones"
                />
            </div>
            <div>
              <FlatButton
                label="Cancelar"
                primary={true}
                onClick={this.props.cancelCreate}
                />
              <FlatButton
                label="Submit"
                primary={true}
                type="submit"
                />
            </div>
          </form>
        </Dialog>
      </div>
    );
  }
  
}

NewQuoteModal.propTypes = {
  quote: React.PropTypes.object,
  handleSubmit: React.PropTypes.func,
  cancelCreate: React.PropTypes.func
};

NewQuoteModal = reduxForm({
  form: 'newquote'
})(NewQuoteModal);

export default NewQuoteModal;