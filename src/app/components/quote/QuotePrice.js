import React, {PropTypes, Component} from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class QuotePrice extends Component {

  createMarkup(htmlContent) {
    return {__html: htmlContent};
  }

  editTitle = () => {
    this.props.editTitle(this.props.value);
  }

  editPrice = (item) => {
    this.props.editPrice(this.props.value, item);
  }

  addBullet = (listItem, action) => {
    this.props.addBullet('price', this.props.value, listItem, action);
  }

  moveBullet = (listItem, action) => {
    this.props.moveBullet('price', this.props.value, listItem, action);
  }

  removeBullet = (listItem) => {
    this.props.removeBullet('price', this.props.value, listItem);
  }

  render() {
    const {title, text, price} = this.props.value.content;

    let total = 0;

    const renderedRows = price.value.map((element, index) => {
      total += parseFloat(element.price);
      return (
        <TableRow key={index}>
          <TableRowColumn>
            <div className="has-up-menu up-menu-table">
              {element.concept}
              <div className="up-menu">
                <button onClick={this.editPrice.bind(this, element)}>Editar</button>
                <button onClick={this.moveBullet.bind(this, element, 'down')}>Bajar</button>
                <button onClick={this.moveBullet.bind(this, element, 'up')}>Subir</button>
                <button onClick={this.addBullet.bind(this, element, 'down')}>Agregar abajo</button>
                <button onClick={this.addBullet.bind(this, element, 'up')}>Aregar arriba</button>
                <button onClick={this.removeBullet.bind(this, element)}>Eliminar</button>
                <button>Actualizar origen</button>
              </div>
            </div>
          </TableRowColumn>
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
        <div>
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
  editTitle: React.PropTypes.func,
  editPrice: React.PropTypes.func,
  addBullet: React.PropTypes.func,
  moveBullet: React.PropTypes.func,
  removeBullet: React.PropTypes.func
};

export default QuotePrice;
