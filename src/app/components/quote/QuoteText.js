import React, {PropTypes, Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../../actions/index';
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
    const {title, text} = this.props.value.content;
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
            <button onClick={this.props.actions.removeElement.bind(this, this.props.index)}>Eliminar</button>
            <button>Actualizar origen</button>
          </div>
        </h1>
        <div className="has-up-menu commented">
          <div className="up-menu">
            <button onClick={this.editText}>Editar</button>
            <button>Guardar</button>
            <button>Eliminar</button>
            <button>Actualizar origen</button>
          </div>
          {this.showComment(text)}
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
  moveSection: React.PropTypes.func,
  index: React.PropTypes.number
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
)(QuoteText);