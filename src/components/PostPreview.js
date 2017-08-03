//client/src/components/PostPreview.js
import React from 'react';
import { gql, graphql } from 'react-apollo';
const PostPreview = ({ data: {loading, error, post } }) => {  
return (
    <div>
      <div className="postName">
        {post ? post.name : 'Loading...'}
      </div>
      <div>Loading Comments</div>
    </div>
  );
};
export const postQuery = gql`
  query PostQuery($postId : ID!) {
    post(id: $postId) {
      id
      name
    }
  }
`;
export default (graphql(postQuery, {
  options: (props) => ({
    variables: { postId: props.postId },
  }),
})(PostPreview));