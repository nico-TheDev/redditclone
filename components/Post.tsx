import {
    ArrowDownIcon,
    ArrowUpIcon,
    BookmarkIcon,
    ChatAltIcon,
    DotsHorizontalIcon,
    GiftIcon,
    ShareIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TimeAgo from "react-timeago";
import { Jelly } from "@uiball/loaders";

import Avatar from "./Avatar";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_VOTES_BY_POST_ID } from "../graphql/queries";
import { ADD_VOTE } from "../graphql/mutations";

type Props = {
    post: Post;
};

function Post({ post }: Props) {
    const [vote, setVote] = useState<boolean | undefined>();
    const { data: session } = useSession();

    const { data, error } = useQuery(GET_ALL_VOTES_BY_POST_ID, {
        variables: {
            post_id: post?.id,
        },
    });

    const [addVote] = useMutation(ADD_VOTE, {
        refetchQueries: [GET_ALL_VOTES_BY_POST_ID, "getVotesByPostId"],
    });

    useEffect(() => {
        const votes: Vote[] = data?.getVotesByPostId;

        const vote = votes?.find(
            (vote) => vote.username === session?.user?.name
        )?.upvote;

        setVote(vote);
    }, [data]);

    const upvote = async (isUpvote: boolean) => {
        if (!session) {
            toast.error("Sign in first before voting.");
            return;
        }
        if (vote && isUpvote) return;
        if (vote === false && !isUpvote) return;

        console.log("VOTING");

        await addVote({
            variables: {
                post_id: post?.id,
                username: session?.user?.name,
                upvote: isUpvote,
            },
        });
    };

    const displayVotes = (data: any) => {
        const votes: Vote[] = data?.getVotesByPostId;
        const displayNumber = votes?.reduce(
            (total, vote) => (vote.upvote ? (total += 1) : (total -= 1)),
            0
        );

        if (votes?.length === 0) return 0;
        if (displayNumber === 0) {
            return votes[0].upvote ? 1 : -1;
        }

        return displayNumber;
    };

    if (!post) {
        return (
            <div className="flex w-full items-center justify-center p-10 text-xl">
                <Jelly size={50} speed={0.9} color="#ff4501" />
            </div>
        );
    }

    return (
        <Link href={`/post/${post.id}`}>
            <div className="rounded-md flex cursor-pointer border boder-gray-300 bg-white shadow-sm hover:border hover:border-gray-600">
                {/* VOTE */}
                <div className="flex flex-col items-center justify-start rounded-l-md  p-4 text-gray-400">
                    <ArrowUpIcon
                        onClick={() => upvote(true)}
                        className={`voteButtons hover:text-red-500 ${
                            vote && "text-red-500"
                        }`}
                    />
                    <p className="text-xs text-black font-bold">
                        {displayVotes(data)}
                    </p>
                    <ArrowDownIcon
                        onClick={() => upvote(false)}
                        className={`voteButtons hover:text-blue-500 ${
                            vote === false && "text-blue-500"
                        }`}
                    />
                </div>

                <div className="p-3 pb-1">
                    {/* HEADER */}
                    <div className="flex items-center space-x-2">
                        <Avatar seed={post.subreddit[0].topic} />
                        <p className="text-xs text-gray-400">
                            <Link
                                href={`/subreddit/${post.subreddit[0].topic}`}
                            >
                                <span className="font-bold text-black hover:text-blue-400 hover:underline">
                                    r/{post.subreddit[0].topic}{" "}
                                </span>
                            </Link>
                            Posted by u/{post.username}{" "}
                            <TimeAgo date={post.created_at} />
                        </p>
                    </div>
                    {/* BODY */}
                    <div className="py-4">
                        <h2 className="text-xl font-semibold">{post.title}</h2>
                        <p className="mt-2 text-sm font-light">{post.body}</p>
                    </div>
                    {/* IMAGE */}
                    <img src={post.image} alt="" className="w-full" />
                    {/* FOOTER */}
                    <div className="flex space-x-4 text-gray-400">
                        <div className="postButtons">
                            <ChatAltIcon className="h-6 w-6" />
                            <p className="">{post.comments.length} Comments</p>
                        </div>
                        <div className="postButtons">
                            <GiftIcon className="h-6 w-6" />
                            <p className="hidden sm:inline">Award</p>
                        </div>
                        <div className="postButtons">
                            <ShareIcon className="h-6 w-6" />
                            <p className="hidden sm:inline">Share</p>
                        </div>
                        <div className="postButtons">
                            <BookmarkIcon className="h-6 w-6" />
                            <p className="hidden sm:inline"> Save</p>
                        </div>
                        <div className="postButtons">
                            <DotsHorizontalIcon className="h-6 w-6" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default Post;
