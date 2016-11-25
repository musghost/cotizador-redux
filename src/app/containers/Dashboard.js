import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as TodoActions from '../actions/index';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import {blue500, yellow600} from 'material-ui/styles/colors';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class Dashboard extends Component {
  render() {
    const {todos, actions} = this.props;
    return (
      <div className="quotations">
        <MuiThemeProvider>
          <div>
            <Toolbar>
              <ToolbarGroup firstChild={true}>
                <TextField
                  hintText="Buscar"
                  style={{marginLeft: '20px'}}
                  />
              </ToolbarGroup>
              <ToolbarGroup>
                <IconButton tooltip="Editar">
                  <span className="font-icon">
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </span>
                </IconButton>
                <IconButton tooltip="Borrar">
                  <span className="font-icon">
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </span>
                </IconButton>
                <IconButton tooltip="Vistazo">
                  <span className="font-icon">
                    <i className="fa fa-eye" aria-hidden="true"></i>
                  </span>
                </IconButton>
                <IconButton tooltip="Compartir">
                  <span className="font-icon">
                    <i className="fa fa-share-alt" aria-hidden="true"></i>
                  </span>
                </IconButton>
                <IconMenu
                  iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                  anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
                >
                  <MenuItem primaryText="Editar acceso" />
                  <MenuItem primaryText="Elegir como origen" />
                  <MenuItem primaryText="Alguna otra?" />
                </IconMenu>
                <FontIcon className="muidocs-icon-custom-sort" />
                <ToolbarSeparator />
                <RaisedButton label="Nueva cotización" primary={true} />
              </ToolbarGroup>
            </Toolbar>
            <div>
              <div className="row">
                <div className="col-sm-2">
                  <List>
                    <ListItem primaryText="Todas" leftIcon={<i className="fa fa-home" aria-hidden="true"></i>} />
                    <ListItem primaryText="Mis cotizaciones" leftIcon={<i className="fa fa-archive" aria-hidden="true"></i>} />
                    <ListItem primaryText="Compartidas" leftIcon={<i className="fa fa-share-alt" aria-hidden="true"></i>} />
                  </List>
                  <Divider />
                  <List>
                    <ListItem primaryText="Orígenes" leftIcon={<i className="fa fa-cube" aria-hidden="true"></i>} />
                  </List>
                </div>
                <div className="col-sm-10">
                  <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                      <TableRow>
                        <TableHeaderColumn>Nombre</TableHeaderColumn>
                        <TableHeaderColumn>Creador</TableHeaderColumn>
                        <TableHeaderColumn>Fecha de modificación</TableHeaderColumn>
                        <TableHeaderColumn>Fecha de expiración</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                      <TableRow>
                        <TableRowColumn>
                          <div className="doc-intro">
                            <div>
                              <i className="fa fa-file-text" aria-hidden="true"></i>
                            </div>
                            <span>Cotización propia</span>
                          </div>
                        </TableRowColumn>
                        <TableRowColumn>John Smith</TableRowColumn>
                        <TableRowColumn>12 Oct, 2016</TableRowColumn>
                        <TableRowColumn>30 Oct, 2016</TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>
                          <div className="doc-intro">
                            <div>
                              <i className="fa fa-file-text" aria-hidden="true"></i>
                            </div>
                            <span>Cotización sitio de WordPress</span>
                          </div>
                        </TableRowColumn>
                        <TableRowColumn>John Smith</TableRowColumn>
                        <TableRowColumn>12 Oct, 2016</TableRowColumn>
                        <TableRowColumn>30 Oct, 2016</TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>
                          <div className="doc-intro">
                            <div>
                              <i className="fa fa-file-text" aria-hidden="true"></i>
                            </div>
                            <span>Cotización App para educación</span>
                          </div>
                        </TableRowColumn>
                        <TableRowColumn>John Smith</TableRowColumn>
                        <TableRowColumn>12 Oct, 2016</TableRowColumn>
                        <TableRowColumn>30 Oct, 2016</TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>
                          <div className="doc-intro">
                            <div>
                              <i className="fa fa-file-text" aria-hidden="true"></i>
                            </div>
                            <span>Cotización infraestructura</span>
                          </div>
                        </TableRowColumn>
                        <TableRowColumn>John Smith</TableRowColumn>
                        <TableRowColumn>12 Oct, 2016</TableRowColumn>
                        <TableRowColumn>30 Oct, 2016</TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>
                          <div className="doc-intro">
                            <div className="doc-intro-shared">
                              <i className="fa fa-file-text" aria-hidden="true"></i>
                            </div>
                            <span>Cotización compartida</span>
                          </div>
                        </TableRowColumn>
                        <TableRowColumn>John Smith</TableRowColumn>
                        <TableRowColumn>12 Oct, 2016</TableRowColumn>
                        <TableRowColumn>30 Oct, 2016</TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>
                          <div className="doc-intro">
                            <div>
                              <i className="fa fa-file-text" aria-hidden="true"></i>
                            </div>
                            <span>Cotización API RESTful</span>
                          </div>
                        </TableRowColumn>
                        <TableRowColumn>John Smith</TableRowColumn>
                        <TableRowColumn>12 Oct, 2016</TableRowColumn>
                        <TableRowColumn>30 Oct, 2016</TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>
                          <div className="doc-intro">
                            <div>
                              <i className="fa fa-file-text-o" aria-hidden="true"></i>
                            </div>
                            <span>Cotización origen</span>
                          </div>
                        </TableRowColumn>
                        <TableRowColumn>John Smith</TableRowColumn>
                        <TableRowColumn>12 Oct, 2016</TableRowColumn>
                        <TableRowColumn>30 Oct, 2016</TableRowColumn>
                      </TableRow>
                    </TableBody>
                  </Table>
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
)(Dashboard);
