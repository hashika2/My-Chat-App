import React from 'react';
import store from './store';
import {Provider} from 'react-redux'
import PrivateRoute from './PrivateRoute';

import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';

import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from './auth/Register';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" exact component={Join} />
        <Route path="/chat" component={Chat} />
        <Route path="/register" component={Register} />
      </Router> 
    </Provider>
    
  );
}

export default App;
