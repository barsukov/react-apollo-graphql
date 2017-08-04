import React, { Component } from 'react';
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
const commentsSubscription = gql`
  subscription commentAdded($postId: ID!) {
    commentAdded(postId: $postId) {
      id
      text
    }
  }
`
class PostDetails extends Component {
  componentWillMount() {
    this.props.data.subscribeToMore({
      document: commentsSubscription,
      variables: {
        postId: this.props.match.params.postId,
      },
      updateQuery: (prev, {subscriptionData}) => {
        if (!subscriptionData.data) {
          return prev;
        }
        const newComment = subscriptionData.data.commentAdded;
        // don't double add the comment
        if (!prev.post.comments.find((msg) => msg.id === newComment.id)) {
          return Object.assign({}, prev, {
            post: Object.assign({}, prev.post, {
              comments: [...prev.post.comments, newComment],
            })
          });
        } else {
          return prev;
        }
      }
    });
  }
  render() {
    const { data: {loading, error, post }, match } = this.props;

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
}


export default (graphql(postDetailsQuery, {
  options: (props) => ({
    variables: { postId: props.match.params.postId },
  }),
})(PostDetails));