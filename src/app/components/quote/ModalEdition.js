import React, {PropTypes, Component} from 'react';
import Dialog from 'material-ui/Dialog';
import {reduxForm, Field} from 'redux-form';
import {TextField} from 'redux-form-material-ui';

class ModalEdition extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      open: true
    }
  }

  renderFormType() {
    const type = this.props.type;
    switch (type) {
      case 'text': {
        return (
          <Field
            name="value"
            component={TextField}
            floatingLabelText="Título"
            fullWidth={Boolean(true)}
            autoFocus={Boolean(true)}
            />
        )
      }
    }
  }

  render() {

    return (
      <Dialog
        title="Editar Texto"
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
        >
        <form onSubmit={this.props.handleSubmit}>
          {this.renderFormType()}
        </form>
      </Dialog>
    );
  }
}

ModalEdition.propTypes = {
  type: React.PropTypes.string,
  handleSubmit: PropTypes.func.isRequired
};

ModalEdition = reduxForm({
  form: 'quote'
})(ModalEdition);

export default ModalEdition;
