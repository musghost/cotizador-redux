import React, {Component, PropTypes} from 'react';
import * as allActions from '../actions/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import moment from 'moment';

class ListUsers extends Component {

  componentDidMount() {
    const {actions} = this.props;
    actions.getUsers();
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

  renderTable() {
    return (
      <Table selectable={Boolean(true)}>
        <TableHeader displaySelectAll={Boolean(false)} adjustForCheckbox={Boolean(false)}>
          <TableRow>
            <TableHeaderColumn>Nombre</TableHeaderColumn>
            <TableHeaderColumn>Correo</TableHeaderColumn>
            <TableHeaderColumn>Fecha de creación</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        {this.tableBody()}
      </Table>
    );
  }

  render() {
    const {loading} = this.props.users;
    return (<div>
      {loading ? (<h1>Loading</h1>) : this.renderTable()}
    </div>);
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
