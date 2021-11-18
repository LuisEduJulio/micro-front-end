import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import GetAppIcon from '@material-ui/icons/GetApp';

import * as actions from '../../stores/modules/namePokemom/namePokemon.actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ListMenu } from '../../components/listMenu';

const classes = {
    toolbar: {
        flexGrow: 0,
        margin: 0,
    },
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItens: 'center',
        flexDirection: 'row',
        flexGrow: 0,
    },
    menuButton: {
        marginRight: '10',
    },
    title: {
        flexGrow: 1,
    },
}


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    getNamePokemon = () => {
        this.props.getNamePokemom();
    }

    handleDrawerOpen = () => {
        this.setState({
            open: true
        });
    };

    handleDrawerClose = () => {
        this.setState({
            open: false
        });
    };

    render() {
        return (
            <>
                <AppBar
                    position="static"
                    className={classes.toolbar}
                    elevation={0}
                >
                    <Toolbar className={classes.container}>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                            onClick={this.handleDrawerOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Pokémon
                        </Typography>                       
                    </Toolbar>
                </AppBar>
                <ListMenu
                    handleDrawerClose={this.handleDrawerClose}
                    index={[{name: 'Buscar Pokemon', action: () => this.props.getNamePokemom(), icon: <GetAppIcon /> }]}
                    icons={['All mail', 'Trash', 'Spam']}
                    open={this.state.open}
                />
            </>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(null, mapDispatchToProps)(Header);