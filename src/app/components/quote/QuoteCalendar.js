import React, {PropTypes, Component} from 'react';

class QuoteCalendar extends Component {

  editTitle = () => {
    this.props.editTitle(this.props.value);
  }

  editCalendar = (item) => {
    this.props.editCalendar(this.props.value, item)
  }

  addBullet = (listItem, action) => {
    this.props.addBullet('calendar', this.props.value, listItem, action);
  }

  moveBullet = (listItem, action) => {
    this.props.moveBullet('calendar', this.props.value, listItem, action);
  }

  removeBullet = (listItem) => {
    this.props.removeBullet('calendar', this.props.value, listItem);
  }

  moveSection = (direction) => {
    this.props.moveSection(this.props.value, direction);
  }

  render() {
    const {title, calendar} = this.props.value.content;

    const tableRows = calendar.value.map((element, index) => {
      const {from, to, concept} = element;
      const length = to - from;

      return (
        <tr key={index}>
          <td>
            <div className="has-up-menu up-menu-table">
              {concept}
              <div className="up-menu">
                <button onClick={this.editCalendar.bind(this, element)}>Editar</button>
                <button>Guardar</button>
                <button onClick={this.moveBullet.bind(this, element, 'down')}>Bajar</button>
                <button onClick={this.moveBullet.bind(this, element, 'up')}>Subir</button>
                <button onClick={this.removeBullet.bind(this, element)}>Eliminar</button>
                <button onClick={this.addBullet.bind(this, element, 'down')}>Agregar abajo</button>
                <button onClick={this.addBullet.bind(this, element, 'up')}>Aregar arriba</button>
                <button>Actualizar origen</button>
              </div>
            </div>
          </td>
          {(from > 1) ? <td colSpan={from}></td> : null}
          <td className="selected" colSpan={length}>{length} semanas</td>
          <td colSpan={calendar.total - length - from + 1}></td>
        </tr>
      );
    });

    return (
      <div>
        <h1 className="has-up-menu">
          {title.value}
          <div className="up-menu">
            <button onClick={this.editTitle}>Editar</button>
            <button>Guardar</button>
            <button onClick={this.moveSection.bind(this, 'down')}>Bajar sección</button>
            <button onClick={this.moveSection.bind(this, 'up')}>Subir sección</button>
            <button>Eliminar</button>
            <button>Actualizar origen</button>
          </div>
        </h1>
        <div>
          <table className="working-table">
            <thead>
              <tr>
                <th width="20%">Concepto</th>
                <th colSpan="14">Semanas</th>
              </tr>
            </thead>
            <tbody>
              {tableRows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

QuoteCalendar.propTypes = {
  value: React.PropTypes.object,
  editTitle: React.PropTypes.func,
  editCalendar: React.PropTypes.func,
  addBullet: React.PropTypes.func,
  moveBullet: React.PropTypes.func,
  removeBullet: React.PropTypes.func,
  moveSection: React.PropTypes.func
};

export default QuoteCalendar;
