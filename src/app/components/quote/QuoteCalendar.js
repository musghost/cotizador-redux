import React, {PropTypes, Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../../actions/index';

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

  handleShowComments = (text) => {
    const actions = this.props.actions;
    actions.setCurrentComments(this.props.value, text.id);
  }

  showComment = (text) => {
    if(text.comments && text.comments.length > 0) {
      return (
        <span className="text-commented" onClick={this.handleShowComments.bind(this, text)}>
          <i className="fa fa-commenting-o" aria-hidden="true"></i>
        </span>
      );
    }
    return (
      <span className="text-commented" onClick={this.handleShowComments.bind(this, text)}>
        <i className="fa fa-commenting-o" aria-hidden="true"></i>
      </span>
    );
  }

  render() {
    const {title, calendar} = this.props.value.content;

    const tableRows = calendar.value.map((element, index) => {
      const {from, to, concept} = element;
      const length = to - from;

      return (
        <tr key={index}>
          <td>
            <div className="commented has-up-menu up-menu-table">
              {concept}
              {this.showComment(element)}
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
        <h1 className="commented has-up-menu">
          {title.value}
          {this.showComment(title)}
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

function mapStateToProps(state) {
  return {
    quote: state.quote
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuoteCalendar);
