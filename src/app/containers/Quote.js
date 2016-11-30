import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {EditQuote} from '../components/EditQuote';
import * as Actions from '../actions/index';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from  'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';

import FlatButton from 'material-ui/FlatButton';

class Quote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState({
      open: !this.state.open
    });

    console.log(this.state.open);
  }

  render() {
    const {quote, actions} = this.props;
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
              <h1>Cotización de webapp para Aeroméxico
                <span className="edit-hidden">
                  <span className="edit-wrapper">
                    <IconMenu
                      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                      targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    >
                      <MenuItem primaryText="Editar" />
                      <MenuItem primaryText="Guardar" />
                      <MenuItem primaryText="Bajar Sección" />
                      <MenuItem primaryText="Subir sección" />
                      <MenuItem primaryText="Eliminar" />
                      <MenuItem primaryText="Actulizar origen" />
                    </IconMenu>
                  </span>
                </span>
              </h1>
              <p>Texto abierto. Se valen negritas e itálicas. Y salto de párrafo. Deseable, no requerido, ligas. No permitir más de dos saltos de línea seguidos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet blandit erat. Integer eu massa sit amet augue fermentum vulputate vel sed ex. Nunc sagittis dolor in justo molestie tristique. Vivamus placerat bibendum diam, vel iaculis tellus aliquet in. Duis pharetra purus non sem pharetra, eu consequat justo tincidunt. Vivamus tincidunt mi odio, nec varius dui ultricies sit amet. Nulla vel ultrices sapien. Idealmente permitir viñetas y numéricos.
              </p>
              <ul>
                <li>Aquí va una viñeta en el texto.</li>
                <li>Morbi tristique sagittis elit, non molestie dolor auctor quis. </li>
                <li>Donec vitae venenatis nulla. </li>
              </ul>
              <p>Y también pongo ejemplo de numéricos.</p>
              <ol>
                <li>Etiam et tellus non justo efficitur consectetur sit amet in quam. </li>
                <li>Praesent et fringilla ante. </li>
                <li>Pellentesque dictum dolor nec justo molestie, in suscipit ligula iaculis. </li>
                <li>Donec laoreet odio ac augue consectetur, et efficitur nibh cursus. </li>
                <li>Nam et risus non lacus rhoncus pellentesque.</li>
              </ol>
              <p>Pellentesque vestibulum justo nibh, sed auctor purus imperdiet id. Nulla auctor aliquam leo. Duis vitae scelerisque libero. Deseable, no requerido. Curabitur et dui et ante gravida dignissim. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In hac habitasse platea dictumst. Etiam facilisis sem quis elit efficitur hendrerit. Nam malesuada elit nec eros luctus, non pharetra nisl sagittis. Sed porttitor, tellus sit amet consectetur consectetur, libero lacus consequat orci, ut vulputate nisi diam non diam. Quisque non commodo metus. Integer mollis tincidunt enim non accumsan. Maecenas convallis est magna, sit amet pulvinar elit suscipit ut. Aliquam at felis ornare, auctor turpis eget, viverra risus. Sed rhoncus turpis nulla, eu finibus felis finibus at. Nulla a pellentesque orci. 
              </p>
              <h1>Sección tipo listado</h1>
              <p>La sección de listado puede tener un sección de texto hasta arriba. Como la presente y luego viñetas. Se distingue de la sección de texto en que las viñetas específicas forman parte de la cotización base como elementos, no como parte del texto. Esto será más claro en la vista de edición. </p>
              <p>Deseable, no requerido, formato de negritas e itálicas en cada parte del listado. Deseable, no requerido, poder elegir si la lista tendrá un formato de viñeta o numérico. Deseable, no requerido, poder tener ligas en la lista. A continuación ejemplo de listado de viñetas. </p>
              <ul>
                <li className="commented">
                  Aquí va una viñeta en el texto.
                  <span className="text-commented" onClick={this.handleToggle}>
                    <i className="fa fa-commenting-o" aria-hidden="true"></i>
                  </span>
                </li>
                <li className="commented">Morbi tristique sagittis elit, non molestie dolor auctor quis. </li>
                <li className="commented">Donec vitae venenatis nulla. </li>
                <li>Etiam et tellus non justo efficitur consectetur sit amet in quam. </li>
                <li>Praesent et fringilla ante. </li>
                <li>Pellentesque dictum dolor nec justo molestie, in suscipit ligula iaculis. </li>
                <li>Donec laoreet odio ac augue consectetur, et efficitur nibh cursus. </li>
                <li>Nam et risus non lacus rhoncus pellentesque.</li>
              </ul>
              <h1>Sección tipo imágenes</h1>
              <p>La sección de imágenes puede tener un sección de texto hasta arriba. Como la presente y luego imagen. No nos preocupa alineación o tamaño. La sección puede o no tener más de una imagen. </p>
              <p>Las imágenes, por supuesto, deben poder cargarse desde la computadora del usuario.</p>
              <div className="text-center">
                <img src="http://r.ddmcdn.com/s_f/o_1/cx_633/cy_0/cw_1725/ch_1725/w_720/APL/uploads/2014/11/too-cute-doggone-it-video-playlist.jpg" />
              </div>
              <h1>Sección tipo calendario de trabajo</h1>
              <table className="working-table">
                <thead>
                  <tr>
                    <th width="20%">Concepto</th>
                    <th colSpan="20">Semanas</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Consultoría</td>
                    <td className="selected" colSpan="3">3 semanas</td>
                    <td colSpan="17"></td>
                  </tr>
                  <tr>
                    <td>Diseño y modelado técnico</td>
                    <td colSpan="3"></td>
                    <td className="selected" colSpan="2">2 semanas</td>
                    <td colSpan="15"></td>
                  </tr>
                  <tr>
                    <td>Diseño gráfico</td>
                    <td colSpan="5"></td>
                    <td className="selected" colSpan="3">3 semanas</td>
                    <td colSpan="12"></td>
                  </tr>
                  <tr>
                    <td>Desarrollo de las aplicaciones</td>
                    <td colSpan="8"></td>
                    <td className="selected" colSpan="6">6 semanas</td>
                    <td colSpan="6"></td>
                  </tr>
                </tbody>
              </table>
              <h1>Sección tipo contraprestación</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn>Concepto</TableHeaderColumn>
                    <TableHeaderColumn>Monto</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  <TableRow>
                    <TableRowColumn>Implementación de infraestructura</TableRowColumn>
                    <TableRowColumn>$1,000.00</TableRowColumn>
                  </TableRow>
                  <TableRow>
                    <TableRowColumn>Diseño de arquitectura</TableRowColumn>
                    <TableRowColumn>$500.00</TableRowColumn>
                  </TableRow>
                  <TableRow>
                    <TableRowColumn><strong>Total</strong></TableRowColumn>
                    <TableRowColumn>$1,500.00</TableRowColumn>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Paper>
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
