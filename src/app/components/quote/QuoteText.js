import React, {PropTypes, Component} from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class QuoteText extends Component {

  createMarkup(htmlContent) {
    return {__html: htmlContent};
  }

  editTitle = () => {
    this.props.editTitle(this.props.value);
  }

  editText = () => {
    this.props.editText(this.props.value);
  }

  moveSection = (direction) => {
    this.props.moveSection(this.props.value, direction);
  }

  render() {
    const {title, text} = this.props.value.content;
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
            <button onClick={this.editText}>Editar</button>
            <button>Guardar</button>
            <button>Bajar sección</button>
            <button>Subir sección</button>
            <button>Eliminar</button>
            <button>Actualizar origen</button>
          </div>
          <div dangerouslySetInnerHTML={this.createMarkup(text.value)}></div>
        </div>
      </div>
    );
  }
}

QuoteText.propTypes = {
  value: React.PropTypes.object,
  editTitle: React.PropTypes.func,
  editText: React.PropTypes.func,
  moveSection: React.PropTypes.func
};

export default QuoteText;
