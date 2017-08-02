import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PostListWithData from './components/PostListWithData'

import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo';

const networkInterface = createNetworkInterface({ 
  uri: 'http://localhost:4000/graphql',
});

networkInterface.use([{
  applyMiddleware(req, next) {
    setTimeout(next, 500);
  },
}]);

const client = new ApolloClient({
   networkInterface,
 });

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to Apollo and React</h2>
          </div>
          <PostListWithData />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
