import { useQuery } from "@apollo/client";
import React from "react";
import { Jelly } from "@uiball/loaders";

import { GET_ALL_POSTS, GET_ALL_POSTS_BY_TOPIC } from "../graphql/queries";
import Post from "./Post";

type Props = {
    topic?: string;
};

function Feed({ topic }: Props) {
    const { data, error, loading } = !topic
        ? useQuery(GET_ALL_POSTS)
        : useQuery(GET_ALL_POSTS_BY_TOPIC, {
              variables: { topic },
          });
    const posts: Post[] = !topic ? data?.getPostList : data?.getPostListByTopic;

    if (loading) {
        return (
            <div className="mt-5 mr-5 w-full bg-white flex items-center justify-center h-40">
                <Jelly size={80} speed={0.9} color="#ff4501" />
            </div>
        );
    }

    return (
        <div className="mt-5 space-y-4 mr-5">
            {posts?.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
}

export default Feed;
