// ./apollo-client.js

import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://zion.stepzen.net/api/messy-lion/__graphql ",
    headers: {
        Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
    },
    cache: new InMemoryCache(),
});

export default client;
