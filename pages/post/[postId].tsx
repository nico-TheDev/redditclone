import { useMutation, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import TimeAgo from "react-timeago";
import Avatar from "../../components/Avatar";
import Post from "../../components/Post";
import { ADD_COMMENT } from "../../graphql/mutations";
import { GET_POST_BY_POST_ID } from "../../graphql/queries";

type FormData = {
    comment: string;
};

function PostPage() {
    const { query } = useRouter();
    const { postId } = query;
    const [addComment] = useMutation(ADD_COMMENT, {
        refetchQueries: [GET_POST_BY_POST_ID, "getPostByPostId"],
    });
    const { data } = useQuery(GET_POST_BY_POST_ID, {
        variables: {
            post_id: postId,
        },
    });

    const { data: session } = useSession();

    const post: Post = data?.getPostByPostId;
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log(data);
        const notification = toast.loading("Posting your comment...");

        await addComment({
            variables: {
                post_id: postId,
                username: session?.user?.name,
                text: data.comment,
            },
        });

        setValue("comment", "");
        toast.success("Comment Posted!", { id: notification });
    };
    console.log(data);

    return (
        <div className="mx-auto max-w-5xl my-7">
            <Post post={post} />

            <div className="-mt-1 rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16">
                <p className="text-red-500">
                    Comment as <span>{session?.user?.name}</span>
                </p>

                <form
                    className="flex flex-col space-y-2"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <textarea
                        {...register("comment")}
                        className="h-24 rounded-md border border-gray-300 p-2 ml-4 outline-none disabled:bg-gray-50"
                        placeholder={
                            session
                                ? "What are your thoughts ?"
                                : "Sign in to comment"
                        }
                        disabled={!session}
                    />

                    <button
                        type="submit"
                        className="rounded-full bg-red-500 text-white font-semibold disabled:bg-gray-200 p-3"
                    >
                        Comment
                    </button>
                </form>

                <div className="-my-5 rounded-b-md border border-t-0 border-gray-300 bg-white py-5 px-10">
                    <hr className="py-2" />
                    {post?.comments.map((comment) => (
                        <div
                            className="relative flex items-center space-x-2 space-y-5"
                            key={comment.id}
                        >
                            <hr className="absolute top-10 h-16 border left-7 z-0" />
                            <div className="z-50">
                                <Avatar seed={comment.username} />
                            </div>
                            <div className="flex flex-col">
                                <p>
                                    <span className="font-semibold text-gray-600">
                                        {comment.username}
                                    </span>{" "}
                                    <TimeAgo
                                        date={comment.created_at}
                                        className="text-sm text-gray-400"
                                    />
                                </p>
                                <p>{comment.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PostPage;
