import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PostListWithData from './components/PostListWithData'
import NotFound from './components/NotFound';
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import PostDetails from './components/PostDetails';

import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
  toIdValue,
} from 'react-apollo';

const networkInterface = createNetworkInterface({ 
  uri: 'http://localhost:4000/graphql',
});

networkInterface.use([{
  applyMiddleware(req, next) {
    setTimeout(next, 500);
  },
}]);

function dataIdFromObject (result) {
  if (result.__typename) {
    if (result.id !== undefined) {
      return `${result.__typename}:${result.id}`;
    }
  }
  return null;
}

const client = new ApolloClient({
   networkInterface,
   customResolvers: {
    Query: {
      post: (_, args) => {
        return toIdValue(dataIdFromObject({ __typename: 'Post', id: args['id'] }))
      },
    },
  },
  dataIdFromObject,
 });

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div className="App">
            <Link to="/" className="navbar">React + GraphQL Tutorial</Link>
            <Switch>
              <Route exact path="/" component={PostListWithData}/>
              <Route path="/post/:postId" component={PostDetails}/>
              <Route component={ NotFound }/>
            </Switch>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
