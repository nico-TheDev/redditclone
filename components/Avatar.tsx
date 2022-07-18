import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

type Props = {
    seed?: string;
    large?: boolean;
};

function Avatar({ seed, large }: Props) {
    const { data: session } = useSession();
    return (
        <div
            className={`relative w-10 h-10 rounded-full border border-gray-300 bg-white overflow-hidden ${
                large && "h-20 w-20"
            }`}
        >
            <Image
                layout="fill"
                src={`https://avatars.dicebear.com/api/open-peeps/${
                    seed || session?.user?.name || "placeholder"
                }.svg`}
            />
        </div>
    );
}

export default Avatar;
