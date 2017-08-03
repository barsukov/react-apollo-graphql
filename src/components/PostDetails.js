import React from 'react';
import { gql, graphql } from 'react-apollo';
import CommentList from './CommentList';
import NotFound from './NotFound';
import PostPreview from './PostPreview';

export const postDetailsQuery = gql`
  query PostDetailsQuery($postId : ID!) {
    post(id: $postId) {
      id
      name
      comments {
        id
        text
      }
    }
  }
`;

const PostDetails = ({ data: {loading, error, post }, match }) => {
  if (loading) {
    return <PostPreview postId={match.params.postId}/>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  if(post === null){
    return <NotFound />
  }
  return (<div>
      <div className="postName">
        {post.name}
      </div>
      <CommentList comments={post.comments}/>
    </div>);
}

export default (graphql(postDetailsQuery, {
  options: (props) => ({
    variables: { postId: props.match.params.postId },
  }),
})(PostDetails));