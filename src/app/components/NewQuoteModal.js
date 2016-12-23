import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {TextField} from 'redux-form-material-ui';
import Errors from './Errors';

class NewQuoteModal extends Component {

  renderErrors = () => {
    const {status} = this.props;
    if(status.loading) {
      return (
        <div className="loading">
          <img src="assets/img/loading.gif"/>
        </div>
      );
    } else if(status.errors) {
      return (
        <div>
          <h4>¡Oops!</h4>
          <Errors errors={status.errors}/>
        </div>
      );
    }
  }

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
          <div className="row">
            <div className="col-sm-6">
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
            </div>
            <div className="col-sm-6">
              {this.renderErrors()}
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
  
}

NewQuoteModal.propTypes = {
  quote: React.PropTypes.object,
  handleSubmit: React.PropTypes.func,
  cancelCreate: React.PropTypes.func,
  status: React.PropTypes.object
};

NewQuoteModal = reduxForm({
  form: 'newquote'
})(NewQuoteModal);

export default NewQuoteModal;