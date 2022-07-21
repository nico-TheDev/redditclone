import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import Post from "../../components/Post";
import { GET_POST_BY_POST_ID } from "../../graphql/queries";

function PostPage() {
    const { query } = useRouter();
    const { postId } = query;
    const { data } = useQuery(GET_POST_BY_POST_ID, {
        variables: {
            post_id: postId,
        },
    });

    const { data: session } = useSession();

    const post: Post = data?.getPostByPostId;

    return (
        <div className="mx-auto max-w-5xl my-7">
            <Post post={post} />

            <div className="-mt-1 rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16">
                <p className="text-red-500">
                    Comment as <span>{session?.user?.name}</span>
                </p>

                <form>
                    <textarea
                        className="h-24 rounded-md border border-gray-300 p-2 ml-4 outline-none disabled:bg-gray-50"
                        placeholder={
                            session
                                ? "What are your thoughts ?"
                                : "Sign in to comment"
                        }
                        disabled={!session}
                    ></textarea>

                    <button
                        type="submit"
                        className="rounded-full bg-red-500 text-white font-semibold disabled:bg-gray-200 p-3"
                    >
                        Comment
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PostPage;
