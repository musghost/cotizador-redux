import React, {PropTypes, Component} from 'react';

class QuoteCalendar extends Component {

  editTitle = () => {
    this.props.editTitle(this.props.value);
  }

  editCalendar = (item) => {
    this.props.editCalendar(this.props.value, item)
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
                <button>Bajar sección</button>
                <button>Subir sección</button>
                <button>Eliminar</button>
                <button>Actualizar origen</button>
              </div>
            </div>
          </td>
          {(from > 1) ? <td colSpan={from - 1}></td> : null}
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
            <button>Bajar sección</button>
            <button>Subir sección</button>
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
  editCalendar: React.PropTypes.func
};

export default QuoteCalendar;
