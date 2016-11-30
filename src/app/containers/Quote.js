import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {EditQuote} from '../components/EditQuote';
import * as Actions from '../actions/index';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from  'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton/IconButton';
import Drawer from 'material-ui/Drawer';
import Subheader from 'material-ui/Subheader';

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
      initialValues: null,
      node: null
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
            />
        }
        case 'list': {
          return <QuoteList
            value={element}
            key={index}
            editTitle={this.editTitle}
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
            />
        }
        case 'price': {
          return <QuotePrice
            value={element}
            key={index}
            editTitle={this.editTitle}
            />
        }
      }
      return null;
    });
    return (
      <MuiThemeProvider>
        <div className="quotation-view">
          <Drawer width={200} openSecondary={true} open={this.state.open} >
            <Subheader>Comentarios</Subheader>
            <div className="comment unseen">
              <div className="attend">
                <IconButton tooltip="¿Atendido?" tooltipPosition={'top-center'} tooltipStyles={{color: '#ffffff'}}>
                  <i className="fa fa-check" aria-hidden="true"></i>
                </IconButton>
              </div>
              <div><strong>Andrés</strong></div>
              <span>
                Creo que es mejor agregar más tiempo a esta parte.
              </span>
            </div>
            <div className="comment">
              <div className="text-right"><strong>Fernando</strong></div>
              <span>¿Qué parte es la que afecta a los tiempos?</span>
            </div>
            <div className="comment">
              <div><strong>Andrés</strong></div>
              <span>Olvidamos incluir recuperación de contraseña.</span>
            </div>
            <div className="comment">
              <div className="text-right"><strong>Fernando</strong></div>
              <span>Ya veo.</span>
            </div>
            <div className="comment-form">
              <TextField
                multiLine={true}
                rows={2}
                rowsMax={4}
                fullWidth={true}
                floatingLabelText="Comentar"
                inputStyle={{fontSize: '12px'}}
                floatingLabelStyle={{fontSize: '12px'}}
                textareaStyle={{fontSize: '12px'}}
                underlineStyle={{fontSize: '12px'}}
                hintText="Comentar" />
              <RaisedButton label="Agregar" labelStyle={{fontSize: '12px', textTransform: 'none'}} />
            </div>
          </Drawer>
          <Paper zDepth={1}>
            <div className="quotation-view-wrapper">
              {elements}
            </div>
          </Paper>
          {this.state.editing ? (
            <ModalEdition
              onSubmit={this.handleSubmit}
              initialValues={this.state.initialValues}
              node={this.state.node}
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
