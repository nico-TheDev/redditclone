import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { LinkIcon, PhotographIcon } from "@heroicons/react/outline";
import { useForm } from "react-hook-form";

import Avatar from "./Avatar";

type FormData = {
    postTitle: string;
    postBody: string;
    postImage: string;
    subrreddit: string;
};

function Postbox() {
    const { data: session } = useSession();
    const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = handleSubmit(async (formData) => {
        console.log(formData);
    });

    return (
        <form
            className="sticky top-16 bg-white border rounded-md border-gray-300 p-2"
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
                            ? "Create a post by entering a title"
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

                    <div className="flex items-center">
                        <p className="min-w-[90px]">Subreddit</p>
                        <input
                            {...register("subrreddit", { required: true })}
                            className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                            type="text"
                            placeholder="e.g ReactJS"
                        />
                    </div>

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
                            {errors.subrreddit?.type === "required" && (
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
