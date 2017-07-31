import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AddPost from './components/AddPost.js';

import {
  ApolloClient,
  gql,
  graphql,
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo';

const networkInterface = createNetworkInterface({ 
  uri: 'http://localhost:4000/graphql',
});

const PostLists = ({ data: {loading, error, posts }}) => {
   if (loading) {
     return <p>Loading ...</p>;
   }
   if (error) {
     return <p>{error.message}</p>;
   }
   return <div className="Posts">
     <AddPost />
     { posts.map( post => <li key={post.id}>{post.name}</li> ) }
   </div>;
 };

const client = new ApolloClient({
   networkInterface,
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
