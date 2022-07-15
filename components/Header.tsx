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

function Header() {
    return (
        <div className="sticky top-0 z-50 flex items-center bg-white px-4 py-2 shadow-sm">
            <div className="relative h-10 w-20 flex-shrink-0">
                <Image
                    src="https://links.papareact.com/fqy"
                    layout="fill"
                    objectFit="contain"
                />
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
            <div className="ml-5 flex items-center lg:hidden">
                <MenuIcon className="icon" />
            </div>
        </div>
    );
}

export default Header;
