import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class ActionModal extends Component {

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    return (
      <Dialog
        title={this.props.title}
        actions={this.props.actions}
        modal={this.props.frozen}
        open={true}
        >
        {this.props.children}
      </Dialog>
    );
  }
}

ActionModal.propTypes = {
  frozen: React.PropTypes.bool,
  title: React.PropTypes.string,
  actions: React.PropTypes.array
};

export default ActionModal;