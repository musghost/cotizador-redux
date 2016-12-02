import React, {Component} from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router';

class CustomToolbar extends Component {

  handleNewQuote() {
    browserHistory.push('/quote');
  }

  goToQuote() {
    browserHistory.push('/quote');
  }

  changeSearch = (e) => {
    this.props.searchBy(e.target.value);
  }

  render() {
    const quoteSelected = this.props.quoteSelected;
    let toolbarDisabled = true;
    let title = '';
    let project;
    if(quoteSelected) {
      toolbarDisabled = false;
      project = quoteSelected.project;
      title = this.props.quoteSelected
    }
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          <TextField
            onChange={this.changeSearch}
            hintText="Buscar"
            style={{marginLeft: '20px'}}
            />
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarTitle text={project} />
          <IconButton tooltip="Editar" disabled={toolbarDisabled} onClick={this.goToQuote}>
            <span className="font-icon">
              <i className="fa fa-pencil" aria-hidden="true"></i>
            </span>
          </IconButton>
          <IconButton tooltip="Borrar" disabled={toolbarDisabled}>
            <span className="font-icon">
              <i className="fa fa-trash" aria-hidden="true"></i>
            </span>
          </IconButton>
          <IconButton tooltip="Vistazo" disabled={toolbarDisabled}>
            <span className="font-icon">
              <i className="fa fa-eye" aria-hidden="true"></i>
            </span>
          </IconButton>
          <IconButton tooltip="Compartir" disabled={toolbarDisabled}>
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
          <RaisedButton label="Nueva cotización" onClick={this.handleNewQuote.bind(this)} primary={true} />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

CustomToolbar.propTypes = {
  quoteSelected: React.PropTypes.object,
  searchBy: React.PropTypes.func
};

export default CustomToolbar;