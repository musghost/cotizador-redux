import React, {PropTypes, Component} from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class QuotePrice extends Component {

  createMarkup(htmlContent) {
    return {__html: htmlContent};
  }

  editTitle = () => {
    this.props.editTitle(this.props.value);
  }

  render() {
    const {title, text, concepts} = this.props.value.content;

    let total = 0;

    const renderedRows = concepts.value.map((element, index) => {
      total += parseFloat(element.price);
      return (
        <TableRow key={index}>
          <TableRowColumn>{element.concept}</TableRowColumn>
          <TableRowColumn>{element.price}</TableRowColumn>
        </TableRow>
      );
    });

    return (
      <div>
        <h1 className="has-up-menu">
          {title.value}
          <div className="up-menu">
            <button onClick={this.editTitle}>Editar</button>
            <button>Guardar</button>
            <button>Bajar sección</button>
            <button>Subir sección</button>
            <button>Eliminar</button>
            <button>Actualizar origen</button>
          </div>
        </h1>
        <div className="has-up-menu">
          <div className="up-menu">
            <button>Editar</button>
            <button>Guardar</button>
            <button>Bajar sección</button>
            <button>Subir sección</button>
            <button>Eliminar</button>
            <button>Actualizar origen</button>
          </div>
          <div dangerouslySetInnerHTML={this.createMarkup(text.value)}></div>
        </div>
        <div className="has-up-menu">
          <div className="up-menu">
            <button>Editar</button>
            <button>Guardar</button>
            <button>Bajar sección</button>
            <button>Subir sección</button>
            <button>Eliminar</button>
            <button>Actualizar origen</button>
          </div>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Concepto</TableHeaderColumn>
                <TableHeaderColumn>Monto</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {renderedRows}
              <TableRow>
                <TableRowColumn><strong>Total</strong></TableRowColumn>
                <TableRowColumn>${total}</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

QuotePrice.propTypes = {
  value: React.PropTypes.object,
  editTitle: React.PropTypes.func
};

export default QuotePrice;
