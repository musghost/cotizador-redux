import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class ModalAddElement extends Component {

  state = {
    finished: false,
    stepIndex: 0,
    type: ''
  }

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 1,
    });
  }

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  }

  handleSelectType = (type) => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 1,
      type
    });
  }

  handleSetElement = (index) => {
    this.props.addElement(this.state.type, index);
  }

  getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <div className="add-elements-row">
              <div className="add-elements-column">
                <div className="add-element" onClick={this.handleSelectType.bind(this, 'text')}>
                  <div><i className="fa fa-font"></i></div>
                  <div><span className="add-element-label">Texto</span></div>
                </div>
              </div>
              <div className="add-elements-column">
                <div className="add-element" onClick={this.handleSelectType.bind(this, 'list')}>
                  <div><i className="fa fa-th-list"></i></div>
                  <div><span className="add-element-label">Lista</span></div>
                </div>
              </div>
              <div className="add-elements-column">
                <div className="add-element" onClick={this.handleSelectType.bind(this, 'images')}>
                  <div><i className="fa fa-picture-o"></i></div>
                  <div><span className="add-element-label">Imagen</span></div>
                </div>
              </div>
            </div>
            <div className="add-elements-row">
              <div className="add-elements-column">
                <div className="add-element" onClick={this.handleSelectType.bind(this, 'calendar')}>
                  <div><i className="fa fa-calendar-o"></i></div>
                  <div><span className="add-element-label">Calendario</span></div>
                </div>
              </div>
              <div className="add-elements-column">
                <div className="add-element" onClick={this.handleSelectType.bind(this, 'price')}>
                  <div><i className="fa fa-bars"></i></div>
                  <div><span className="add-element-label">Contrapropuesta</span></div>
                </div>
              </div>
            </div>
          </div>
        );
      case 1:
        const renderedElems = this.props.quote.map((elem, index) => {
          return (
            <div key={index}>
              <h2>{elem.content.title.value}</h2>
              <div>
                <button onClick={this.handleSetElement.bind(this, index)}>Arriba <i className="fa fa-caret-up" aria-hidden="true"></i></button>
                <button onClick={this.handleSetElement.bind(this, index + 1)}>Abajo <i className="fa fa-caret-down" aria-hidden="true"></i></button>
              </div>
            </div>
          );
        });
        return (
          <div className="add-element-qlist">{renderedElems}</div>
        );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  render() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};
    const actions = [
      <FlatButton
        label="Regresar"
        disabled={stepIndex === 0}
        onTouchTap={this.handlePrev}
        primary={true}
      />,
      <FlatButton
        label="Cancelar"
        primary={true}
        onClick={this.props.hide}
      />,
    ];

    return (
      <Dialog
        title="Agregar elemento"
        actions={actions}
        modal={true}
        open={this.props.show}
        >
        <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>Selecciona el tipo de elemento</StepLabel>
            </Step>
            <Step>
              <StepLabel>Selecciona la posición del elemento</StepLabel>
            </Step>
          </Stepper>
          <div style={contentStyle}>
            <div>{this.getStepContent(stepIndex)}</div>
          </div>
        </div>
        
      </Dialog>
    );
  }
}

ModalAddElement.propTypes = {
  quote: React.PropTypes.array,
  show: React.PropTypes.bool,
  hide: React.PropTypes.func,
  addElement: React.PropTypes.func
};

export default ModalAddElement;