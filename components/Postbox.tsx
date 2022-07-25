import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { LinkIcon, PhotographIcon } from "@heroicons/react/outline";
import { useForm } from "react-hook-form";

import Avatar from "./Avatar";
import { useMutation } from "@apollo/client";
import { ADD_POST, ADD_SUBREDDIT } from "../graphql/mutations";
import client from "../apollo-client";
import { GET_ALL_POSTS, GET_SUBREDDIT_BY_TOPIC } from "../graphql/queries";
import toast from "react-hot-toast";

type FormData = {
    postTitle: string;
    postBody: string;
    postImage: string;
    subreddit: string;
};

type Props = {
    subreddit?: string;
};

function Postbox({ subreddit }: Props) {
    const { data: session } = useSession();
    const [addPost] = useMutation(ADD_POST, {
        refetchQueries: [GET_ALL_POSTS, "getPostList"],
    });
    const [addSubreddit] = useMutation(ADD_SUBREDDIT);
    const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = handleSubmit(async (formData) => {
        console.log(formData);
        const notification = toast.loading("Creating new post...");
        try {
            // QUERY for the subreddti
            const {
                data: { getSubredditListByTopic },
            } = await client.query({
                query: GET_SUBREDDIT_BY_TOPIC,
                variables: {
                    topic: subreddit || formData.subreddit,
                },
            });

            const subredditExists = getSubredditListByTopic.length > 0;

            if (!subredditExists) {
                // create the subreddit
                console.log("CREATING NEW SUBREDDIT");
                const {
                    data: { insertSubreddit: newSubreddit },
                } = await addSubreddit({
                    variables: {
                        topic: subreddit || formData.subreddit,
                    },
                });

                console.log("Creating post...", formData);
                const image = formData.postImage || "";

                const {
                    data: { insertPost: newPost },
                } = await addPost({
                    variables: {
                        body: formData.postBody,
                        image,
                        subreddit_id: newSubreddit.id,
                        title: formData.postTitle,
                        username: session?.user?.name,
                    },
                });
                console.log("NEW POST CREATED", newPost);
            } else {
                // use existing subreddit
                console.log("USING EXISTING SUBREDDIT");
                console.log(getSubredditListByTopic);

                const image = formData.postImage || "";

                const {
                    data: { insertPost: newPost },
                } = await addPost({
                    variables: {
                        body: formData.postBody,
                        image,
                        subreddit_id: getSubredditListByTopic[0].id,
                        title: formData.postTitle,
                        username: session?.user?.name,
                    },
                });
                console.log("NEW POST CREATED", newPost);
            }
            toast.success("New Post Created.", {
                id: notification,
            });
            // POST ADDED
            setValue("postTitle", "");
            setValue("postBody", "");
            setValue("postImage", "");
            setValue("subreddit", "");
        } catch (err) {
            toast.error("Whoops Something Went Wrong", {
                id: notification,
            });
            console.log(err);
        }
    });

    return (
        <form
            className="sticky top-16 bg-white border rounded-md border-gray-300 p-2 z-[100]"
            onSubmit={onSubmit}
        >
            <div className="flex items-center space-x-2">
                <Avatar />
                <input
                    disabled={!session}
                    className="bg-gray-50 p-2 pl-5 outline-none flex-1"
                    type="text"
                    placeholder={
                        session
                            ? subreddit
                                ? `Create a post in r/${subreddit}`
                                : "Create a post by entering a title"
                            : "Sign In to Post"
                    }
                    {...register("postTitle", { required: true })}
                />

                <PhotographIcon
                    onClick={() => setImageBoxOpen(!imageBoxOpen)}
                    className={`h-6 text-gray-300 cursor-pointer ${
                        imageBoxOpen && "text-blue-300"
                    }`}
                />
                <LinkIcon className="h-6 text-gray-300 cursor-pointer" />
            </div>

            {!!watch("postTitle") && (
                <div className="flex flex-col py-2">
                    {/* body */}
                    <div className="flex items-center">
                        <p className="min-w-[90px]">Body</p>
                        <input
                            {...register("postBody")}
                            className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                            type="text"
                            placeholder="Text (Optional)"
                        />
                    </div>

                    {!subreddit && (
                        <div className="flex items-center">
                            <p className="min-w-[90px]">Subreddit</p>
                            <input
                                {...register("subreddit", { required: true })}
                                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                                type="text"
                                placeholder="e.g ReactJS"
                            />
                        </div>
                    )}

                    {imageBoxOpen && (
                        <div className="flex items-center">
                            <p className="min-w-[90px]">Image URL: </p>
                            <input
                                {...register("postImage")}
                                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                                type="text"
                                placeholder="Optional ..."
                            />
                        </div>
                    )}

                    {Object.keys(errors).length > 0 && (
                        <div className="py-4">
                            {errors.postTitle?.type === "required" && (
                                <p className="text-red-500">
                                    - A Post title is required
                                </p>
                            )}
                            {errors.subreddit?.type === "required" && (
                                <p className="text-red-500">
                                    - A Subreddit is required
                                </p>
                            )}
                        </div>
                    )}

                    {!!watch("postTitle") && (
                        <button
                            type="submit"
                            className="w-full rounded-full bg-blue-500 p-2 text-white"
                        >
                            Create Post
                        </button>
                    )}
                </div>
            )}
        </form>
    );
}

export default Postbox;
