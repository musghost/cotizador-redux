import React, {Component, PropTypes} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LoginForm from './../components/LoginForm';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as TodoActions from '../actions/index';

class Login extends Component {

  handleSubmit = values => {
    console.log(values);
  }

  render() {
    const {todos, actions} = this.props;
    console.log(todos);
    return (
      <div>
        <MuiThemeProvider>
          <LoginForm onSubmit={this.handleSubmit} actions={actions}/>
        </MuiThemeProvider>
      </div>
    );
  }
}

Login.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    todos: state.todos
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
