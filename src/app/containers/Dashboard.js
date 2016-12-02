import React, {Component, PropTypes} from 'react';
import CustomToolbar from './../components/CustomToolbar';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as allActions from '../actions/index';
import ListQuotes from '../components/ListQuotes';
import {browserHistory} from 'react-router';

import {List, ListItem} from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import {blue500, yellow600} from 'material-ui/styles/colors';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      quoteSelected: null,
      word: ''
    };
  }

  selectQuote = (quote) => {
    this.setState({quoteSelected: quote});
  }

  componentWillMount() {
    const {actions} = this.props;
    actions.getQuotes();
  }

  searchBy = word => {
    this.setState({word: word});
  }

  filter(by = '') {
    const {actions, user} = this.props;
    switch(by) {
      case 'origin': {
        by = 'is_origin=true';
        break;
      }
      case 'own': {
        by = `user_id=${user.user.id}`;
        break;
      }
    }
    actions.getQuotes(by);
  }

  logout = () => {
    const {actions} = this.props;
    actions.logout();
    browserHistory.push('/');
  }

  render() {
    const {quotes, actions, user} = this.props;
    const word = this.state.word;
    let orderedQuotes = quotes.quotes;
    if(word) {
      orderedQuotes = quotes.quotes.reduce((accumuator, currentVal) => {
        user
        if(currentVal.project.toLowerCase().indexOf(word.toLowerCase()) >= 0) {
          accumuator.push(currentVal);
          return accumuator;
        }
        if(currentVal.user.name.toLowerCase().indexOf(word.toLowerCase()) >= 0) {
          accumuator.push(currentVal);
          return accumuator;
        }
        if(currentVal.user.email.toLowerCase().indexOf(word.toLowerCase()) >= 0) {
          accumuator.push(currentVal);
          return accumuator;
        }
        return accumuator;
      }, []);
    }
    return (
      <div className="quotations">
        <MuiThemeProvider>
          <div>
            <CustomToolbar
              quoteSelected={this.state.quoteSelected}
              searchBy={this.searchBy}
              user={user}
              />
            <div>
              <div className="row">
                <div className="col-sm-2">
                  <List>
                    <ListItem
                      primaryText="Todas"
                      leftIcon={<i className="fa fa-home" aria-hidden="true"></i>}
                      onClick={this.filter.bind(this)}
                      />
                    <ListItem
                      primaryText="Mis cotizaciones"
                      leftIcon={<i className="fa fa-archive" aria-hidden="true"></i>}
                      onClick={this.filter.bind(this, 'own')}
                      />
                    <ListItem primaryText="Compartidas" leftIcon={<i className="fa fa-share-alt" aria-hidden="true"></i>} />
                  </List>
                  <Divider />
                  <List>
                    <ListItem
                      primaryText="Orígenes"
                      leftIcon={<i className="fa fa-cube" aria-hidden="true"></i>}
                      onClick={this.filter.bind(this, 'origin')}
                      />
                  </List>
                  <Divider />
                  <List>
                    <ListItem
                      primaryText="Salir"
                      leftIcon={<i className="fa fa-sign-out" aria-hidden="true"></i>}
                      onClick={this.logout}
                      />
                  </List>
                </div>
                <div className="col-sm-10">
                  <ListQuotes
                    selectQuote={this.selectQuote}
                    quotes={orderedQuotes}
                    />
                </div>
              </div>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

Dashboard.propTypes = {
  quotes: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    quotes: state.quotes,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(allActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
