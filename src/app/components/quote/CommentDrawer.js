import React, {Component} from 'React';
import Drawer from 'material-ui/Drawer';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton/IconButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class CommentDrawer extends Component {
  render() {
    return (
      <Drawer width={200} openSecondary={true} open={false} >
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
    );
  }
}

export default CommentDrawer;