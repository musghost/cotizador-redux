import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton/IconButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class QuoteDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  renderComments = () => {
    const {comments} = this.props.comments;
    const renderedComments = comments.map((comment, index) => {
      return (
        <div className="comment unseen" key={index}>
          <div className="attend">
            <IconButton tooltip="¿Atendido?" tooltipPosition={'top-center'} tooltipStyles={{color: '#ffffff'}}>
              <i className="fa fa-check" aria-hidden="true"></i>
            </IconButton>
          </div>
          <div>
            <div><strong>{comment.from.name}</strong></div>
            <div><small>{comment.date}</small></div>
          </div>
          <span>{comment.value}</span>
        </div>
      );
    });
    return renderedComments;
  }

  handleSendComment = () => {
    this.props.leaveComment(this.state.text);
    this.setState({
      text: ''
    });
  }

  handleCloseDrawer = () => {
    this.props.clearComments();
  }

  render() {
    const {id} = this.props.comments;
    return (
      <Drawer width={200} openSecondary={true} open={typeof id !== 'undefined'} >
        <Subheader className="subheader" style={{position: "relative"}}>
          Comentarios
          <span className="close-drawer" onClick={this.handleCloseDrawer}><i className="fa fa-times"></i></span>
        </Subheader>
        {this.renderComments()}
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
            onChange={(e) => {this.setState({text: e.target.value});}}
            hintText="Comentar"
            value={this.state.text}
            />
          <RaisedButton
            label="Agregar"
            labelStyle={{fontSize: '12px', textTransform: 'none'}}
            onClick={this.handleSendComment}
            />
        </div>
      </Drawer>
    );
  }
}

QuoteDrawer.propTypes = {
  comments: React.PropTypes.object,
  leaveComment: React.PropTypes.func,
  clearComments: React.PropTypes.func
};

export default QuoteDrawer;