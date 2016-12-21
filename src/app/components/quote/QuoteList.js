import React, {PropTypes, Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../../actions/index';

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
    const {title, text, list} = this.props.value.content;

    const renderedList = list.value.map((element, index) => {
      return (
        <li className="commented has-up-menu" key={index}>
          {element.value}
          {this.showComment(element)}
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
        <h1 className="has-up-menu commented">
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
        <div className="has-up-menu commented">
          <div className="up-menu">
            <button>Editar</button>
            <button>Guardar</button>
            <button>Eliminar</button>
            <button>Actualizar origen</button>
          </div>
          {this.showComment(text)}
          <div dangerouslySetInnerHTML={this.createMarkup(text.value)}></div>
        </div>
        <ul>
          {renderedList}
        </ul>
      </div>
    );
  }
}

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

QuoteList.propTypes = {
  value: React.PropTypes.object,
  editTitle: React.PropTypes.func,
  editBullet: React.PropTypes.func,
  addBullet: React.PropTypes.func,
  moveBullet: React.PropTypes.func,
  removeBullet: React.PropTypes.func,
  moveSection: React.PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuoteList);
