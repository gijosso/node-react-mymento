import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './utils/Root'
import configureStore from './store/configureStore'

export const store = configureStore();
store.state = ({isLoggedIn: false, apiUrl: "http://localhost:6969/api/", userId: undefined});
export const history = syncHistoryWithStore(browserHistory, store);

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);
