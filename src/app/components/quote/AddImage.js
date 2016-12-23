import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Dropzone from 'react-dropzone';
import RaisedButton from 'material-ui/RaisedButton';
import * as allActions from '../../actions/index';

class AddImage extends Component {

  state = {
    files: []
  }

  onDrop = (files) => {
    this.setState({files});
  }

  uploadFile = () => {
    const {actions, quote} = this.props;
    actions.uploadImage(quote.quoteId, this.state.files);
  }

  render() {
    if(this.state.files.length <= 0) {
      return (
        <div>
          <Dropzone onDrop={this.onDrop} multiple={false}>
            <div>Arrastra tu archivo aquí o haz click para agregarlo.</div>
          </Dropzone>
        </div>
      );
    } else {
      const renderedImages = this.state.files.map((file, index) => {
        return (
          <div key={index} className="row">
            <div className="col-sm-4">
              <img src={file.preview}/>
            </div>
            <div className="col-sm-8">
              <p>{file.name}</p>
              <ul>
                <li>{file.size} bytes</li>
                <li>{file.type}</li>
              </ul>
              <div>
                <RaisedButton
                  label="Cargar"
                  primary={true}
                  onClick={this.uploadFile}
                  disabled={this.props.attach.image !== ''}
                  />
              </div>
              {this.props.attach.image !== '' ? (<div>
                <p>La imagen ha sido cargada, ¿desear guardarla?</p>
              </div>) : null}
            </div>
          </div>
        );
      });
      return (
        <div className="list-images">

          {renderedImages}
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    quote: state.quote,
    attach: state.attach
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
)(AddImage);
