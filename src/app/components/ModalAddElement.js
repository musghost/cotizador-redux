import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class ModalAddElement extends Component {
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
      />,
    ];

    return (
      <Dialog
        title="Agregar elemento"
        actions={actions}
        modal={false}
        open={true}
        >
        <div className="add-elements-row">
          <div className="add-elements-column">
            <div className="add-element">
              <i className="fa fa-font"></i>
            </div>
          </div>
          <div className="add-elements-column">
            <div className="add-element">
              <i className="fa fa-th-list"></i>
            </div>
          </div>
          <div className="add-elements-column">
            <div className="add-element">
              <i className="fa fa-picture-o"></i>
            </div>
          </div>
        </div>
        <div className="add-elements-row">
          <div className="add-elements-column">
            <div className="add-element">
              <i className="fa fa-font"></i>
            </div>
          </div>
          <div className="add-elements-column">
            <div className="add-element">
              <i className="fa fa-th-list"></i>
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default ModalAddElement;