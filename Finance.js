import React, { Component } from 'react';
import {
  // Header,
  // Link,
  nativeHistory,
  Route,
  Router,
  // StackRoute,
  // withRouter,
} from 'react-router-native';

import { Provider } from 'mobx-react/native';

// Views
import MainView from './app/views/main';
import SettingsView from './app/views/settings';
import AddView from './app/views/add';

import listStore from './app/store/listStore';
import selectedStore from './app/store/selectedStore';

// @todo remove when RN upstream is fixed
console.ignoredYellowBox = [];

const stores = { listStore, selectedStore };

export default class AppRouter extends Component {
  render() {
    return (
      <Provider {...stores}>
        <Router history={nativeHistory}>
          <Route path="/" component={MainView} />
          <Route path="settings" title="Stocks" component={SettingsView} />
          <Route path="add" component={AddView} />
        </Router>
      </Provider>
    );
  }
}
