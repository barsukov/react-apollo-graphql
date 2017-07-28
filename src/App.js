import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  ApolloClient,
  gql,
  graphql,
  ApolloProvider,
} from 'react-apollo';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';
import { typeDefs } from './schema';

const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({ schema });
const mockNetworkInterface = mockNetworkInterfaceWithSchema({ schema });

const PostLists = ({ data: {loading, error, posts }}) => {
   if (loading) {
     return <p>Loading ...</p>;
   }
   if (error) {
     return <p>{error.message}</p>;
   }
   return <ul>
     { posts.map( post => <li key={post.id}>{post.name}</li> ) }
   </ul>;
 };

const client = new ApolloClient({
   networkInterface: mockNetworkInterface,
 });

const postsListQuery = gql`
   query PostsQuery {
     posts {
       id
       name
     }
   }
 `;

const PostListWithData = graphql(postsListQuery)(PostLists);

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
