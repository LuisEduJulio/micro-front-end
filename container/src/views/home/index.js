import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Container from '@material-ui/core/Container';

import * as actions from '../../stores/modules/namePokemom/namePokemon.actions';
import { Snackbars } from "../../components/snackbars";
import LoadingComponent from "../../components/loadingComponent";
import ErrorBoundary from "../../util/ErrorBoundary";

const RemoteTable = lazy(() => import("../../remotes/RemoteTable"));

const classes = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 50
  }
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleClose = () => {
    this.props.closeMessage();
  };

  render() {
    const { data, loading, message, open } = this.props.pokemon;

    return (
      <Container
        maxWidth="sm"
        style={classes.container}
      >
        {data ?
          <div>
            {loading ?
              <LoadingComponent />
              :
              <ErrorBoundary>
                <Suspense
                  fallback={
                    <LoadingComponent />
                  }
                >
                  <RemoteTable {...this.props} />
                </Suspense>
              </ErrorBoundary>
            }
          </div>
          : null}
        <Snackbars
          handleClose={this.handleClose}
          open={open}
          message={message}
        />
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

function select(state) {
  const { namePokemon } = state;

  return {
    pokemon: namePokemon
  }
}


export default connect(select, mapDispatchToProps)(Home);