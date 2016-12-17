import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {EditQuote} from '../components/EditQuote';
import Loading from '../components/Loading';
import Errors from '../components/Errors';
import * as Actions from '../actions/index';

import Paper from  'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import QuoteText from '../components/quote/QuoteText';
import QuoteList from '../components/quote/QuoteList';
import QuoteImages from '../components/quote/QuoteImages';
import QuoteCalendar from '../components/quote/QuoteCalendar';
import QuotePrice from '../components/quote/QuotePrice';
import ModalEdition from '../components/quote/ModalEdition';

class Quote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      editing: false,
      element: null,
      subElement: null,
      initialValues: null,
      node: null,
      action: null
    }

    this.handleToggle = this.handleToggle.bind(this);
  }

  componentWillMount() {
    const {actions} = this.props;
    actions.getQuote(this.props.params.id);
  }

  handleSaveQuote = () => {
    const {actions} = this.props;
    const id = this.props.params.id;
    const quote = {
      content: {
        quote: this.props.quote.quote
      }
    };
    actions.saveQuote(id, quote);
  }

  clearState = () => {
    this.setState({
      editing: false,
      initialValues: null,
      element: null,
      node: null
    });
  }

  handleToggle() {
    this.setState({
      open: !this.state.open
    });
  }

  editTitle = (element) => {
    const {title} = element.content;
    this.setState({
      editing: true,
      initialValues: {...title},
      element: {...element},
      node: 'title'
    });
  }

  editBullet = (type, element, listItem) => {
    this.setState({
      editing: true,
      initialValues: {...listItem},
      element: {...element},
      subElement: listItem,
      node: type + '-bullet'
    });
  }

  addBullet = (type, element, listItem, action) => {
    this.setState({
      editing: true,
      element: {...element},
      subElement: listItem,
      action: action,
      node: type + '-add-bullet'
    });
  }

  moveBullet = (type, element, listItem, action) => {
    const {actions} = this.props;
    actions.moveBullet(type, element, listItem, action);
  }

  moveSection = (element, direction) => {
    const {actions} = this.props;
    actions.moveSection(element, direction);
  }

  removeBullet = (type, element, listItem) => {
    const {actions} = this.props;
    actions.removeBullet(type, element, listItem);
  }

  editText = (element) => {
    const {title} = element;
    this.setState({
      editing: true,
      initialValues: {...element},
      element: {...element},
      node: 'text'
    });
  }

  editCalendar = (element, item) => {
    const {title} = element.content;
    this.setState({
      editing: true,
      initialValues: {...item},
      element: {...element},
      node: 'calendar'
    });
  }

  editPrice = (element, item) => {
    const {title} = element.content;
    this.setState({
      editing: true,
      initialValues: {...item},
      element: {...element},
      node: 'price'
    });
  }

  handleSubmit = values => {
    const {actions} = this.props;

    switch(this.state.node) {
      case 'title': {
        actions.setTitle(this.state.element, values.value);
        this.clearState();
        return;
      }
      case 'list-bullet': {
        actions.setBullet('list', this.state.element, this.state.subElement, values.value);
        this.clearState();
        return;
      }
      case 'list-add-bullet': {
        actions.addBullet('list', this.state.element, this.state.subElement, values, this.state.action);
        this.clearState();
        return;
      }
      case 'images-bullet': {
        actions.setBullet('images', this.state.element, this.state.subElement, values.value);
        this.clearState();
        return;
      }
      case 'images-add-bullet': {
        actions.addBullet('images', this.state.element, this.state.subElement, values, this.state.action);
        this.clearState();
        return;
      }
      case 'calendar-bullet': {
        actions.setBullet('calendar', this.state.element, this.state.subElement, values);
        this.clearState();
        return;
      }
      case 'calendar-add-bullet': {
        actions.addBullet('calendar', this.state.element, this.state.subElement, values, this.state.action);
        this.clearState();
        return;
      }
      case 'calendar': {
        actions.setCalendarItem(this.state.element, values);
        this.clearState();
        return;
      }
      case 'price-bullet': {
        actions.setBullet('price', this.state.element, this.state.subElement, values);
        this.clearState();
        return;
      }
      case 'price-add-bullet': {
        actions.addBullet('price', this.state.element, this.state.subElement, values, this.state.action);
        this.clearState();
        return;
      }
      case 'price': {
        actions.setPriceItem(this.state.element, values);
        this.clearState();
        return;
      }
    }
  }

  handleAlternSubmit = content => {
    const {actions} = this.props;

    switch(this.state.node) {
      case 'text': {
        actions.setText(this.state.element, content);
        this.clearState();
      }
    }
  }

  render() {
    const {quote, actions} = this.props;
    let elements = quote.quote.map((element, index) => {
      switch(element.type) {
        case 'text': {
          return <QuoteText
            value={element}
            key={index}
            editTitle={this.editTitle}
            editText={this.editText}
            moveSection={this.moveSection}
            />
        }
        case 'list': {
          return <QuoteList
            value={element}
            key={index}
            editTitle={this.editTitle}
            editBullet={this.editBullet}
            addBullet={this.addBullet}
            moveBullet={this.moveBullet}
            removeBullet={this.removeBullet}
            moveSection={this.moveSection}
            />
        }
        case 'images': {
          return <QuoteImages
            value={element}
            key={index}
            editTitle={this.editTitle}
            editBullet={this.editBullet}
            addBullet={this.addBullet}
            moveBullet={this.moveBullet}
            removeBullet={this.removeBullet}
            moveSection={this.moveSection}
            />
        }
        case 'calendar': {
          return <QuoteCalendar
            value={element}
            key={index}
            editTitle={this.editTitle}
            editCalendar={this.editCalendar}
            addBullet={this.addBullet}
            moveBullet={this.moveBullet}
            removeBullet={this.removeBullet}
            moveSection={this.moveSection}
            />
        }
        case 'price': {
          return <QuotePrice
            value={element}
            key={index}
            editTitle={this.editTitle}
            editPrice={this.editPrice}
            addBullet={this.addBullet}
            moveBullet={this.moveBullet}
            removeBullet={this.removeBullet}
            moveSection={this.moveSection}
            />
        }
      }
      return null;
    });

    return (
      <MuiThemeProvider>
        <div className="quotation-view">
          <div className="floating-menu">
            <div>
              <FloatingActionButton
                href="/#/dashboard"
                >
                <i className="fa fa-long-arrow-left"></i>
              </FloatingActionButton>
            </div>
            <div>
              <FloatingActionButton
                onClick={this.handleSaveQuote}
                >
                <i className="fa fa-floppy-o"></i>
              </FloatingActionButton>
            </div>
          </div>
          {this.props.quote.loading ? <Loading/> : null}
          {this.props.quote.errors ? <Errors errors={this.props.quote.errors}/> : null}
          <Paper zDepth={1}>
            <div className="quotation-view-wrapper">
              {elements}
            </div>
          </Paper>
          {this.state.editing ? (
            <ModalEdition
              onSubmit={this.handleSubmit}
              handleAlternSubmit={this.handleAlternSubmit}
              initialValues={this.state.initialValues}
              node={this.state.node}
              element={this.state.element}
              />
            ) : null}
        </div>
      </MuiThemeProvider>
    );
  }
}

Quote.propTypes = {
  quote: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
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
)(Quote);
