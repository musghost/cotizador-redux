import React, {PropTypes, Component} from 'react';

class QuoteImages extends Component {

  createMarkup(htmlContent) {
    return {__html: htmlContent};
  }

  editTitle = () => {
    this.props.editTitle(this.props.value);
  }

  editBullet = (listItem) => {
    this.props.editBullet('images', this.props.value, listItem);
  }

  addBullet = (listItem, action) => {
    this.props.addBullet('images', this.props.value, listItem, action);
  }

  moveBullet = (listItem, action) => {
    this.props.moveBullet('images', this.props.value, listItem, action);
  }

  removeBullet = (listItem) => {
    this.props.removeBullet('images', this.props.value, listItem);
  }

  moveSection = (direction) => {
    this.props.moveSection(this.props.value, direction);
  }

  render() {
    const {title, text, images} = this.props.value.content;

    const renderedImages = images.value.map((element, index) => {
      return (
        <div className="has-up-menu" key={index}>
          <img src={element.value} />
          <div className="up-menu">
            <button onClick={this.editBullet.bind(this, element)}>Editar</button>
            <button onClick={this.moveBullet.bind(this, element, 'down')}>Bajar</button>
            <button onClick={this.moveBullet.bind(this, element, 'up')}>Subir</button>
            <button onClick={this.addBullet.bind(this, element, 'down')}>Agregar abajo</button>
            <button onClick={this.addBullet.bind(this, element, 'up')}>Aregar arriba</button>
            <button onClick={this.removeBullet.bind(this, element)}>Eliminar</button>
            <button>Actualizar origen</button>
          </div>
        </div>
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
        <div className="text-center">
          {renderedImages}
        </div>
      </div>
    );
  }
}

QuoteImages.propTypes = {
  value: React.PropTypes.object,
  editTitle: React.PropTypes.func,
  editBullet: React.PropTypes.func,
  addBullet: React.PropTypes.func,
  moveBullet: React.PropTypes.func,
  removeBullet: React.PropTypes.func,
  moveSection: React.PropTypes.func
};

export default QuoteImages;
