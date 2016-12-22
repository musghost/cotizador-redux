import React, {Component} from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory, hashHistory} from 'react-router';
import NewQuoteModal from './NewQuoteModal';

class CustomToolbar extends Component {

  state = {
    modalCreate: false
  }

  handleNewQuote() {
    this.setState({
      modalCreate: true
    });
  }

  goToQuote = () => {
    const quoteSelected = this.props.quoteSelected;
    hashHistory.push(`/quote/${quoteSelected.id}`);
  }

  changeSearch = (e) => {
    this.props.searchBy(e.target.value);
  }

  createQuote = (values) => {
    this.props.createQuote(values, this.props.quoteSelected);
    this.setState({modalCreate: false});
  }

  removeQuote = () => {
    const quoteSelected = this.props.quoteSelected;
    this.props.removeQuote(quoteSelected.id);
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
      <div>
        {this.state.modalCreate ? (
          <NewQuoteModal
            onSubmit={this.createQuote}
            quote={this.props.quoteSelected}
            initialValues={{
              client: this.props.quoteSelected.client,
              project: this.props.quoteSelected.project
            }}
            cancelCreate={() => {this.setState({modalCreate: false});}}
            />
        ) : null}
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
            <IconButton
              tooltip="Editar"
              disabled={toolbarDisabled}
              onClick={this.goToQuote}>
              <span className="font-icon">
                <i className="fa fa-pencil" aria-hidden="true"></i>
              </span>
            </IconButton>
            <IconButton
              tooltip="Borrar"
              disabled={toolbarDisabled}
              onClick={this.removeQuote}
              >
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
            <RaisedButton
              label="Nueva cotización"
              onClick={this.handleNewQuote.bind(this)}
              disabled={toolbarDisabled}
              primary={true}
              />
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}

CustomToolbar.propTypes = {
  quoteSelected: React.PropTypes.object,
  searchBy: React.PropTypes.func,
  createQuote: React.PropTypes.func,
  removeQuote: React.PropTypes.func
};

export default CustomToolbar;