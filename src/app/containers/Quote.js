import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {EditQuote} from '../components/EditQuote';
import * as Actions from '../actions/index';

import Paper from  'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import QuoteText from '../components/quote/QuoteText';
import QuoteList from '../components/quote/QuoteList';
import QuoteImages from '../components/quote/QuoteImages';
import QuoteCalendar from '../components/quote/QuoteCalendar';
import QuotePrice from '../components/quote/QuotePrice';
import ModalEdition from '../components/quote/ModalEdition';
//import CommentDrawer from '../components/quote/CommentDrawer';

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

  editBullet = (element, listItem) => {
    this.setState({
      editing: true,
      initialValues: {...listItem},
      element: {...element},
      subElement: listItem,
      node: 'bullet'
    });
  }

  addBullet = (element, listItem, action) => {
    this.setState({
      editing: true,
      element: {...element},
      subElement: listItem,
      action: action,
      node: 'add-bullet'
    });
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
        this.setState({
          editing: false,
          initialValues: null,
          element: null,
          node: null
        });
        return;
      }
      case 'bullet': {
        actions.setBullet(this.state.element, this.state.subElement, values.value);
        this.setState({
          editing: false,
          initialValues: null,
          element: null,
          node: null
        });
        return;
      }
      case 'add-bullet': {
        actions.addBullet(this.state.element, this.state.subElement, values, this.state.action);
        this.setState({
          editing: false,
          initialValues: null,
          element: null,
          node: null
        });
        return;
      }
      case 'calendar': {
        actions.setCalendarItem(this.state.element, values);
        this.setState({
          editing: false,
          initialValues: null,
          element: null,
          node: null
        });
        return;
      }
      case 'price': {
        actions.setPriceItem(this.state.element, values);
        this.setState({
          editing: false,
          initialValues: null,
          element: null,
          node: null
        });
        return;
      }
    }
  }

  handleAlternSubmit = content => {
    const {actions} = this.props;

    switch(this.state.node) {
      case 'text': {
        actions.setText(this.state.element, content);
        this.setState({
          editing: false,
          initialValues: null,
          element: null,
          node: null
        });
      }
    }
  }

  render() {
    const {quote, actions} = this.props;
    const elements = quote.map((element, index) => {
      switch(element.type) {
        case 'text': {
          return <QuoteText
            value={element}
            key={index}
            editTitle={this.editTitle}
            editText={this.editText}
            />
        }
        case 'list': {
          return <QuoteList
            value={element}
            key={index}
            editTitle={this.editTitle}
            editBullet={this.editBullet}
            addBullet={this.addBullet}
            />
        }
        case 'images': {
          return <QuoteImages
            value={element}
            key={index}
            editTitle={this.editTitle}
            />
        }
        case 'calendar': {
          return <QuoteCalendar
            value={element}
            key={index}
            editTitle={this.editTitle}
            editCalendar={this.editCalendar}
            />
        }
        case 'price': {
          return <QuotePrice
            value={element}
            key={index}
            editTitle={this.editTitle}
            editPrice={this.editPrice}
            />
        }
      }
      return null;
    });
    return (
      <MuiThemeProvider>
        <div className="quotation-view">
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
  quote: PropTypes.array.isRequired,
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
