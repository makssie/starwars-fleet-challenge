import React from 'react';

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './configureStore';

import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './screens/home';
import ShipDetail from './screens/shipDetail'
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className="app">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/shipDetail/:ID" component={ShipDetail}/>
        </Switch>
        </div>
      </ConnectedRouter>
    </Provider>
    </ThemeProvider>

  );
}

export default App;
