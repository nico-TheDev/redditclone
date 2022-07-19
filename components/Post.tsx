import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/outline";
import React from "react";

type Props = {
    post: Post;
};

function Post({ post }: Props) {
    return (
        <div className="rounded-md flex cursor-pointer border boder-gray-300 bg-white shadow-sm hover:border hover:border-gray-600">
            {/* VOTE */}
            <div className="flex flex-col items-center justify-start rounded-l-md bg-gray-50 p-4 text-gray-400">
                <ArrowUpIcon className="voteButtons hover:text-red-500" />
                <p className="text-xs text-black font-bold">0</p>
                <ArrowDownIcon className="voteButtons hover:text-blue-500" />
            </div>

            <div className="p-3 pb-1">
                {/* HEADER */}
                <div className=""></div>
                {/* BODY */}
                <div className=""></div>
                {/* IMAGE */}
                <div className=""></div>
                {/* FOOTER */}
                <div className=""></div>
            </div>
        </div>
    );
}

export default Post;
