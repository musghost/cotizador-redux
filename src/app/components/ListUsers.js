import React, {Component, PropTypes} from 'react';
import * as allActions from '../actions/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import moment from 'moment';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class ListUsers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      currentUser: null
    }
  }

  componentDidMount() {
    const {actions} = this.props;
    actions.getUsers();
  }

  selectUser = (x) => {

  }

  tableBody = () => {
    const row = this.props.users.users.map((user, index) => {
      return (
        <TableRow key={index}>
          <TableRowColumn><span>{user.name}</span></TableRowColumn>
          <TableRowColumn><span>{user.email}</span></TableRowColumn>
          <TableRowColumn><span>{moment(user.created_at).format('DD MMM, YYYY')}</span></TableRowColumn>
        </TableRow>
      );
    });
    return (
      <TableBody displayRowCheckbox={Boolean(false)}>{row}</TableBody>
    );
  }

  handleClose = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  dialog() {
    const user = this.state.currentUser;

    if(!user){
      return null;
    }

    const actions = [
      <FlatButton
        label="Cancelar"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Eliminar"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    const modal = (
      <Dialog
        title="Eliminar al usuario {user.name}"
        actions={actions}
        modal={false}
        open={true}
        onRequestClose={this.handleClose}
        >
        <div>Realmente deseo eliminar al usuario:</div>
        <div>
          <div>{user.name}</div>
          <div>{user.correo}</div>
        </div>
      </Dialog>
    );

    return showModal ? modal : null;
  }

  renderTable() {

    return (
      <div>
        <Table onCellClick={this.selectUser} selectable={Boolean(true)}>
          <TableHeader displaySelectAll={Boolean(false)} adjustForCheckbox={Boolean(false)}>
            <TableRow>
              <TableHeaderColumn>Nombre</TableHeaderColumn>
              <TableHeaderColumn>Correo</TableHeaderColumn>
              <TableHeaderColumn>Fecha de creación</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          {this.tableBody()}
        </Table>
        {this.dialog()}
      </div>
    );
  }

  render() {
    const {loading} = this.props.users;
    return (
      <div>
        {loading ? (<h1>Loading</h1>) : this.renderTable()}
      </div>
    );
  }
}

ListUsers.propTypes = {
  users: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(allActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListUsers);
