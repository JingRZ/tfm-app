//import ApolloClient from "apollo-boost";
import { ApolloClient, InMemoryCache, createHttpLink, fromPromise, from } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import { onError } from '@apollo/client/link/error';
import { useContext, useLayoutEffect } from 'react';
import AuthContext from '../context/AuthContext';
import CONFIG from './constants';

const GRAPHQL_URI = CONFIG.graphql;

const httpLink = createHttpLink({
    uri: GRAPHQL_URI,
});


const errorLink = (setToken) => onError(({ graphQLErrors, operation, forward, ...rest }) => {

    if(graphQLErrors){
        for (let err of graphQLErrors) {
            if (err.extensions.code === 'INTERNAL_SERVER_ERROR' && err.message.includes('jwt expired')) {
                return fromPromise( async () => {
                    try {
                        //Check if refreshToken is still valid
                        const response = await axios.post(CONFIG.refreshToken);
                        const newToken = response.data.token;
                        setToken(newToken);
                        //originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
                        //originalRequest._retry = true;

                        operation.setContext({
                            headers: {
                                ...operation.getContext().headers,
                                authorization: `bearer ${newToken}`,
                            }
                        });
                        return forward(operation);


                    } catch (error) {
                        console.error('Token refresh failed:', error);
                        throw error;
                    }

                });
            }
        }
    }
});


const createApolloClient = (token) => {

    const authLink = setContext(async (_, { headers, ...rest }) => {
        const apiKey = '4d5bae18c694bd682e94948f34500cc3' || process.env.GRAPHQL_API_KEY; 

        const authHeaders = {
            ...headers,
            'x-api-key': apiKey
        };
    
        if (rest.requiresAuth) {
            console.log("[authLink] Using token: ", token)
            authHeaders.authorization = token ? `bearer ${token}` : "";
        }
        return {headers: authHeaders};
    });

    const { setToken } = useContext(AuthContext);

    return new ApolloClient({
        link: from([authLink, errorLink(setToken), httpLink]),
        cache: new InMemoryCache(),
        
    })
}

export default createApolloClient