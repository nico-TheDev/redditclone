import type { NextPage } from "next";
import Head from "next/head";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Postbox from "../components/Postbox";

const Home: NextPage = () => {
    return (
        <div className="my-7 mx-auto max-w-5xl">
            <Head>
                <title>Reddit Clone</title>
            </Head>
            <Postbox />

            <div className="flex">
                <Feed />
            </div>
        </div>
    );
};

export default Home;
