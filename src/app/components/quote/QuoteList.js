import React, {PropTypes, Component} from 'react';

class QuoteList extends Component {

  createMarkup(htmlContent) {
    return {__html: htmlContent};
  }

  editTitle = () => {
    this.props.editTitle(this.props.value);
  }

  editBullet = (listItem) => {
    this.props.editBullet(this.props.value, listItem);
  }

  addBullet = (listItem, action) => {
    this.props.addBullet(this.props.value, listItem, action);
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
            <button>Bajar sección</button>
            <button>Subir sección</button>
            <button onClick={this.addBullet.bind(this, element, 'down')}>Agregar abajo</button>
            <button>Aregar arriba</button>
            <button>Eliminar</button>
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
  addBullet: React.PropTypes.func
};

export default QuoteList;
