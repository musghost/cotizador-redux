import React, {Component} from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import moment from 'moment';

class ListQuotes extends Component {
  tableBody(){
    const quotes = this.props.quotes.map((quote, i) => {
      return (
        <TableRow key={i}>
          <TableRowColumn>
            <div className="doc-intro">
              <div>
                <i className="fa fa-file-text" aria-hidden="true"></i>
              </div>
              <span>{quote.project}</span>
            </div>
          </TableRowColumn>
          <TableRowColumn>{quote.user_id}</TableRowColumn>
          <TableRowColumn>{moment(quote.updated_at).format('DD MMM, YYYY')}</TableRowColumn>
          <TableRowColumn>{moment(quote.created_at).format('DD MMM, YYYY')}</TableRowColumn>
        </TableRow>
      );
    });
    return (
      <TableBody displayRowCheckbox={false}>
        {quotes}
      </TableBody>
    );
  }

  render() {
    return (
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Nombre</TableHeaderColumn>
            <TableHeaderColumn>Creador</TableHeaderColumn>
            <TableHeaderColumn>Fecha de modificación</TableHeaderColumn>
            <TableHeaderColumn>Fecha de expiración</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        {this.tableBody()}
      </Table>
    );
  }
}

ListQuotes.proptypes = {
  quotes: React.PropTypes.array
};

export default ListQuotes;
