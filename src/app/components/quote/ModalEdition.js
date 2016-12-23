import React, {PropTypes, Component} from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {reduxForm, Field} from 'redux-form';
import {TextField} from 'redux-form-material-ui';
import TinyMCE from 'react-tinymce';
import AddImage from './AddImage';

class ModalEdition extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      open: true,
      textEditorContent: null
    }
  }

  componentWillMount() {
    const node = this.props.node;
    switch (node) {
      case 'text': {
        this.setState({
          textEditorContent: this.props.element.content.text.value
        });
      }
    }
  }

  handleEditorChange = (e) => {
    this.setState({
      textEditorContent: e.target.getContent()
    });
  }

  handleClickSave = () => {
    this.props.handleAlternSubmit(this.state.textEditorContent);
  }

  renderFormType() {
    const node = this.props.node;
    switch (node) {
      case 'title': {
        return (
          <Field
            name="value"
            component={TextField}
            floatingLabelText="Título"
            fullWidth={Boolean(true)}
            autoFocus={Boolean(true)}
            autoComplete="off"
            />
        );
      }
      case 'list-bullet': 
      case 'images-bullet':{
        return (
          <Field
            name="value"
            component={TextField}
            floatingLabelText="Bullet"
            fullWidth={Boolean(true)}
            autoFocus={Boolean(true)}
            autoComplete="off"
            />
        );
      }
      case 'images-add-bullet': {
        return (
          <div>
            <AddImage/>
            <div style={{opacity: 0}}>
              <Field
                name="value"
                component={TextField}
                floatingLabelText="Bullet"
                fullWidth={Boolean(true)}
                autoFocus={Boolean(true)}
                autoComplete="off"
                />
            </div>
            <div className="editor-button">
              <RaisedButton
                primary={Boolean(true)}
                label="Guardar"
                fullWidth={Boolean(true)}
                type="submit"
                />
            </div>
          </div>
        );
      }
      case 'list-add-bullet': {
        return (
          <Field
            name="value"
            component={TextField}
            floatingLabelText="Bullet"
            fullWidth={Boolean(true)}
            autoFocus={Boolean(true)}
            autoComplete="off"
            />
        );
      }
      case 'text': {
        return (
          <div>
            <TinyMCE
              content={this.props.element.content.text.value}
              config={{
                menubar: false,
                height: '400',
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table contextmenu paste code'
                ],
                toolbar: 'bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link'
              }}
              onChange={this.handleEditorChange}
              />
            <div className="editor-button">
              <RaisedButton
                primary={Boolean(true)}
                label="Guardar"
                fullWidth={Boolean(true)}
                onClick={this.handleClickSave}
                />
            </div>
          </div>
        );
      }
      case 'calendar':
      case 'calendar-add-bullet': {
        return (
          <div>
            <div>
              <Field
                name="concept"
                component={TextField}
                floatingLabelText="Concepto"
                fullWidth={Boolean(true)}
                autoFocus={Boolean(true)}
                autoComplete="off"
                />
            </div>
            <div>
              <Field
                name="from"
                component={TextField}
                floatingLabelText="Desde"
                fullWidth={Boolean(true)}
                autoComplete="off"
                />
            </div>
            <div>
              <Field
                name="to"
                component={TextField}
                floatingLabelText="Hasta"
                fullWidth={Boolean(true)}
                autoComplete="off"
                />
            </div>
            <div>
              <RaisedButton
                primary={Boolean(true)}
                label="Guardar"
                fullWidth={Boolean(true)}
                type="submit"
                />
            </div>
          </div>
        );
      }
      case 'price': 
      case 'price-add-bullet': {
        return (
          <div>
            <div>
              <Field
                name="concept"
                component={TextField}
                floatingLabelText="Concepto"
                fullWidth={Boolean(true)}
                autoFocus={Boolean(true)}
                />
            </div>
            <div>
              <Field
                name="price"
                component={TextField}
                floatingLabelText="Desde"
                fullWidth={Boolean(true)}
                />
            </div>
            <div>
              <RaisedButton
                primary={Boolean(true)}
                label="Guardar"
                fullWidth={Boolean(true)}
                type="submit"
                />
            </div>
          </div>
        );
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
  node: React.PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleAlternSubmit: PropTypes.func,
  element: PropTypes.object
};

ModalEdition = reduxForm({
  form: 'quote'
})(ModalEdition);

export default ModalEdition;
