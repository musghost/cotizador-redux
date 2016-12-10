import React, {PropTypes, Component} from 'react';

class QuoteList extends Component {

  createMarkup(htmlContent) {
    return {__html: htmlContent};
  }

  editTitle = () => {
    this.props.editTitle(this.props.value);
  }

  editBullet = (listItem) => {
    this.props.editBullet('list', this.props.value, listItem);
  }

  addBullet = (listItem, action) => {
    this.props.addBullet('list', this.props.value, listItem, action);
  }

  moveBullet = (listItem, action) => {
    this.props.moveBullet('list', this.props.value, listItem, action);
  }

  removeBullet = (listItem) => {
    this.props.removeBullet('list', this.props.value, listItem);
  }

  moveSection = (direction) => {
    this.props.moveSection(this.props.value, direction);
  }

  render() {
    const {title, text, list} = this.props.value.content;

    const renderedList = list.value.map((element, index) => {
      return (
        <li className="commented has-up-menu" key={index}>
          {element.value}
          <span className="text-commented" onClick={this.handleToggle}>
            <i className="fa fa-commenting-o" aria-hidden="true"></i>
          </span>
          <div className="up-menu">
            <button onClick={this.editBullet.bind(this, element)}>Editar</button>
            <button onClick={this.moveBullet.bind(this, element, 'down')}>Bajar</button>
            <button onClick={this.moveBullet.bind(this, element, 'up')}>Subir</button>
            <button onClick={this.addBullet.bind(this, element, 'down')}>Agregar abajo</button>
            <button onClick={this.addBullet.bind(this, element, 'up')}>Aregar arriba</button>
            <button onClick={this.removeBullet.bind(this, element)}>Eliminar</button>
            <button>Actualizar origen</button>
          </div>
        </li>
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
        <div className="has-up-menu">
          <div className="up-menu">
            <button>Editar</button>
            <button>Guardar</button>
            <button>Eliminar</button>
            <button>Actualizar origen</button>
          </div>
          <div dangerouslySetInnerHTML={this.createMarkup(text.value)}></div>
        </div>
        <ul>
          {renderedList}
        </ul>
      </div>
    );
  }
}

QuoteList.propTypes = {
  value: React.PropTypes.object,
  editTitle: React.PropTypes.func,
  editBullet: React.PropTypes.func,
  addBullet: React.PropTypes.func,
  moveBullet: React.PropTypes.func,
  removeBullet: React.PropTypes.func,
  moveSection: React.PropTypes.func
};

export default QuoteList;
