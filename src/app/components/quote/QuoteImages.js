import React, {PropTypes, Component} from 'react';

class QuoteImages extends Component {

  createMarkup(htmlContent) {
    return {__html: htmlContent};
  }

  render() {
    const {title, text, images} = this.props.value.content;

    const renderedImages = images.value.map((element, index) => {
      return (
        <div className="has-up-menu" key={index}>
          <img src={element.value} />
          <div className="up-menu">
            <button>Editar</button>
            <button>Guardar</button>
            <button>Bajar sección</button>
            <button>Subir sección</button>
            <button>Eliminar</button>
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
  value: React.PropTypes.object
};

export default QuoteImages;
