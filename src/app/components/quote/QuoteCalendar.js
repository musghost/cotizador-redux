import React, {PropTypes, Component} from 'react';

class QuoteCalendar extends Component {

  render() {
    const {title, calendar} = this.props.value.content;

    const tableRows = calendar.value.map((element, index) => {
      const {from, to, concept} = element;
      const length = to - from;

      return (
        <tr key={index}>
          <td>{concept}</td>
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
            <button>Editar</button>
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
  value: React.PropTypes.object
};

export default QuoteCalendar;
