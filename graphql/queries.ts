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
