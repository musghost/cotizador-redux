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
import ShareModal from './ShareModal';
import ActionModal from './../components/dashboard/ActionModal';
import Errors from './Errors';

class CustomToolbar extends Component {

  state = {
    modalCreate: false,
    modalShare: false
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
    this.setState({modalCreate: false});
    this.props.createQuote(values, this.props.quoteSelected);
  }

  removeQuote = () => {
    const quoteSelected = this.props.quoteSelected;
    this.props.removeQuote(quoteSelected.id);
  }

  showingModal = () => {
    const {stateQuotes, cleanErrors} = this.props;
    let modal = null;

    for(const type of ['removeQuoteStatus', 'newQuoteStatus']) {
      if(stateQuotes[type].loading){
        modal = (
          <ActionModal
            title=""
            actions={[]}
            frozen={false}
            >
            <div className="modal-status">
              <p className="loading">Cargando...</p>
            </div>
          </ActionModal>
        );
      } else if (stateQuotes[type].errors) {
        const {errors} = stateQuotes[type];
        const actions = [<RaisedButton label="Aceptar" onClick={cleanErrors} />]
        modal = (
          <ActionModal
            title="Error"
            actions={actions}
            frozen={true}
            >
            <div className="modal-status">
              <Errors errors={errors}/>
            </div>
          </ActionModal>
        );
      }
    }
    return modal;
  }

  handleShare = () => {
    this.setState({modalShare: true});
  }

  render() {
    const quoteSelected = this.props.quoteSelected;
    const {stateQuotes} = this.props;
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
            status={stateQuotes.newQuoteStatus}
            cancelCreate={() => {this.setState({modalCreate: false});}}
            />
        ) : null}
        {this.state.modalShare ? (
          <ShareModal
            onSubmit={this.createQuote}
            quote={this.props.quoteSelected}
            initialValues={{
              client: this.props.quoteSelected.client,
              project: this.props.quoteSelected.project
            }}
            status={stateQuotes.newQuoteStatus}
            cancelCreate={() => {this.setState({modalShare: false});}}
            />
        ) : null}
        {this.showingModal()}
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
            <IconButton
              tooltip="Compartir"
              disabled={toolbarDisabled}
              onClick={this.handleShare}
              >
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
  removeQuote: React.PropTypes.func,
  stateQuotes: React.PropTypes.object,
  cleanErrors: React.PropTypes.func
};

export default CustomToolbar;