import React from 'react';
import { gql, graphql } from 'react-apollo';
import AddPost from './AddPost.js';
import { Link } from 'react-router-dom';
const PostLists = ({ data: {loading, error, posts }}) => {
   if (loading) {
     return <p>Loading ...</p>;
   }
   if (error) {
     return <p>{error.message}</p>;
   }
   return <div className="Posts">
     <AddPost />
     
     { posts.map( post => 
        <div key={post.id} className={'post ' + (post.id < 0 ? 'optimistic' : '')}>
          <Link to={post.id < 0 ? `/` : `post/${post.id}`}>
            {post.name}
          </Link>
        </div> )
     }
   </div>;
 };

export const postsListQuery = gql`
   query PostsQuery {
     posts {
       id
       name
     }
   }
 `;
export default graphql(postsListQuery, {
  options: { pollInterval: 5000 },
})(PostLists);

