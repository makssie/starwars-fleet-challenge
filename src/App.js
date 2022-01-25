import React from 'react';

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './configureStore';

import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './screens/home';

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className="app">
        <Switch>
          <Route exact path="/" component={Home}/>
          {/* <Route path="/book/:ID" component={Book}/> */}
        </Switch>
        </div>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
