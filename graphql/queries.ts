import { gql } from "@apollo/client";

export const GET_SUBREDDIT_BY_TOPIC = gql`
    query MyQuery($topic: String!) {
        getSubredditListByTopic(topic: $topic) {
            id
            topic
            created_at
        }
    }
`;

export const GET_ALL_VOTES_BY_POST_ID = gql`
    query MyQuery($post_id: ID!) {
        getVotesByPostId(post_id: $post_id) {
            created_at
            id
            post_id
            upvote
            username
        }
    }
`;

export const GET_POST_BY_POST_ID = gql`
    query MyQuery($post_id: ID!) {
        getPostByPostId(post_id: $post_id) {
            body
            created_at
            username
            id
            image
            title
            subreddit_id
            username
            subreddit {
                id
                topic
                created_at
            }
            comments {
                id
                username
                text
                created_at
            }
            votes {
                id
                upvote
                username
                created_at
            }
        }
    }
`;

export const GET_ALL_POSTS = gql`
    query MyQuery {
        getPostList {
            body
            created_at
            username
            id
            image
            title
            subreddit_id
            username
            subreddit {
                id
                topic
                created_at
            }
            comments {
                id
                username
                text
                created_at
            }
            votes {
                id
                upvote
                username
                created_at
            }
        }
    }
`;

export const GET_ALL_POSTS_BY_TOPIC = gql`
    query MyQuery($topic: String!) {
        getPostListByTopic(topic: $topic) {
            body
            created_at
            username
            id
            image
            title
            subreddit_id
            username
            subreddit {
                id
                topic
                created_at
            }
            comments {
                id
                username
                text
                created_at
            }
            votes {
                id
                upvote
                username
                created_at
            }
        }
    }
`;
