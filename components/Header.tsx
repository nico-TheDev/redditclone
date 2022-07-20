import React from "react";
import Image from "next/image";
import {
    ChevronDownIcon,
    HomeIcon,
    MenuIcon,
    SearchIcon,
} from "@heroicons/react/solid";
import {
    BellIcon,
    ChatIcon,
    GlobeIcon,
    PlusIcon,
    SparklesIcon,
    SpeakerphoneIcon,
    VideoCameraIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

function Header() {
    const { data: session } = useSession();

    return (
        <div className="sticky top-0 z-50 flex items-center bg-white px-4 py-2 shadow-sm">
            <div className="relative h-10 w-20 flex-shrink-0">
                <Link href="/">
                    <Image
                        src="https://links.papareact.com/fqy"
                        layout="fill"
                        objectFit="contain"
                    />
                </Link>
            </div>

            <div className="flex items-center mx-7 xl:min-w-[300px]">
                <HomeIcon className="h-5 w-5 text-blue-500" />
                <p className="flex-1 ml-2 hidden lg:inline">Home</p>
                <ChevronDownIcon className="h-5 w-5 text-blue-500" />
            </div>

            <form className="flex items-center flex-1 space-x-2 border rounded-sm border-gray-200 bg-gray-100 px-3 py-1">
                <SearchIcon className="w-6 h-6 text-gray-400 " />
                <input
                    type="text"
                    placeholder="Search Reddit"
                    className="border-none flex-1 bg-transparent outline-none"
                />
                <button type="submit" hidden />
            </form>
            {/* ICON LISTS */}
            <div className="hidden items-center text-gray-500 space-x-2 lg:inline-flex">
                <SparklesIcon className="icon" />
                <GlobeIcon className="icon" />
                <VideoCameraIcon className="icon" />
                <hr className="h-10 border border-gray-100" />
                <ChatIcon className="icon" />
                <BellIcon className="icon" />
                <PlusIcon className="icon" />
                <SpeakerphoneIcon className="icon" />
            </div>
            {/* MENU BUTTON */}
            <div className="ml-5 flex items-center lg:hidden">
                <MenuIcon className="icon" />
            </div>
            {session ? (
                <div
                    onClick={() => signOut()}
                    className="hidden items-center cursor-pointer space-x-2 p-2 border border-gray-100 lg:flex"
                >
                    <div className="relative w-5 h-5 flex-shrink-0">
                        <Image
                            src="https://links.papareact.com/23l"
                            layout="fill"
                            alt=""
                        />
                    </div>
                    <div className="flex-1 text-xs">
                        <p className="truncate">{session?.user?.name}</p>
                        <p className="text-gray-400">Karma</p>
                    </div>

                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                </div>
            ) : (
                <div
                    onClick={() => signIn()}
                    className="hidden items-center cursor-pointer space-x-2 p-2 border border-gray-100 lg:flex"
                >
                    <div className="relative w-5 h-5 flex-shrink-0">
                        <Image
                            src="https://links.papareact.com/23l"
                            layout="fill"
                            alt=""
                        />
                    </div>
                    <p className="text-gray-400">Sign In</p>
                </div>
            )}
            {/* SIGN IN BUTTON */}
        </div>
    );
}

export default Header;
