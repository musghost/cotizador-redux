import React, {Component} from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import moment from 'moment';

class ListQuotes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: null
    }
  }

  selectQuote(row) {
    if(row == this.state.selected) {
      this.setState({
        selected: null
      });
      this.props.selectQuote(null);
    } else {
      this.setState({
        selected: row
      });
      this.props.selectQuote(this.props.quotes[row]);
    }
  }

  tableBody(){
    const quotes = this.props.quotes.map((quote, i) => {
      let icon = null;
      if (quote.is_origin) {
        icon = <i className="fa fa-file-text" aria-hidden="true"></i>;
      } else {
        icon = <i className="fa fa-file-text-o" aria-hidden="true"></i>;
      }

      if (this.state.selected == i) {
        return (
          <TableRow key={i}>
            <TableRowColumn>
              <div className="doc-intro">
                <div>{icon}</div>
                <span><strong>{quote.project}</strong></span>
              </div>
            </TableRowColumn>
            <TableRowColumn><strong>{quote.project}</strong></TableRowColumn>
            <TableRowColumn><strong>{quote.user.name} <small>{quote.user.email}</small></strong></TableRowColumn>
            <TableRowColumn><strong>{moment(quote.updated_at).format('DD MMM, YYYY')}</strong></TableRowColumn>
            <TableRowColumn><strong>{moment(quote.created_at).format('DD MMM, YYYY')}</strong></TableRowColumn>
          </TableRow>
        );
      } else {
        return (
          <TableRow key={i}>
            <TableRowColumn>
              <div className="doc-intro">
                <div>{icon}</div>
                <span>{quote.project}</span>
              </div>
            </TableRowColumn>
            <TableRowColumn>{quote.project}</TableRowColumn>
            <TableRowColumn>{quote.user.name} <small>{quote.user.email}</small></TableRowColumn>
            <TableRowColumn>{moment(quote.updated_at).format('DD MMM, YYYY')}</TableRowColumn>
            <TableRowColumn>{moment(quote.created_at).format('DD MMM, YYYY')}</TableRowColumn>
          </TableRow>
        );
      }
    });
    return (
      <TableBody displayRowCheckbox={false}>
        {quotes}
      </TableBody>
    );
  }

  render() {
    return (
      <Table onCellClick={this.selectQuote.bind(this)} selectable={true}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Nombre</TableHeaderColumn>
            <TableHeaderColumn>Proyecto</TableHeaderColumn>
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
  quotes: React.PropTypes.array,
  selectQuote: React.PropTypes.func
};

export default ListQuotes;
