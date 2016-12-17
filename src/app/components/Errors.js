import React, {Component} from 'react';

export default class Errors extends Component {
  render() {
    const errors = [];
    let counter = 0;
    for(const error in this.props.errors) {
      errors.push(<li key={counter}><strong>{error}</strong>&nbsp;{this.props.errors[error]}</li>);
      counter++;
    }

    return (
      <div className="errors">
        <ul>{errors}</ul>
      </div>
    );
  }
}

Errors.propTypes = {
  errors: React.PropTypes.object
};
