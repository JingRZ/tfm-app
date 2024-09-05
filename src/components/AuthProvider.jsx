import React, { useState, useEffect, useLayoutEffect } from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import CONFIG from '../utils/constants';


const AuthProvider = ({ children }) => {
    // Default value = undefined means token havent been fetched yet
    const [token, setToken] = useState();
    const value = { token, setToken };

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const response = await axios.post(CONFIG.login);
                // If token has value, its valid
                console.log("[AuthProvider] token fetched: ", response)
                setToken(response.data.token);
            } catch (error) {
                console.log('Failed to fetch token');
                // If token is null, it was checked and is invalid
                setToken(null);
            }
        }

        fetchToken();
    }, []);

    /******************
    *
    * Create a interceptor for axios requests
    * This interceptor will check if we have a token and add it to the Authorization header
    * 
    * UseLayoutEffect blocks the screen rendering until the interceptor is set, whereas
    * useEffect will not block the rendering and just print and change the value on screen whenever
    * the interceptor is set.
    * 
    */
    useLayoutEffect(() => {
        const authInterceptor = axios.interceptors.request.use((config) => {
            console.log("[AuthProvider]", config.headers)
            config.headers.Authorization = 
                token
                ? `Bearer ${token}`
                : config.headers.Authorization;

            console.log("[AuthProvider] token: ", token)
            console.log("[AuthProvider] config.headers.Authorization: ", config.headers.Authorization)
            return config;
        });

        return () => {
            axios.interceptors.response.eject(authInterceptor);
        }
    }, [token]);    //This runs whenever the token changes


    /**
     * Handles the case when server answers with invalid token and gives a new one
     */
    useLayoutEffect(() => {
        const authInterceptor = axios.interceptors.response.use(
            (response) => response,
            async (error) => {   //Check if there's an error in the response
                const originalRequest = error.config;
                console.log("[AuthProvider] error.response: ", error.response)

                if (error.status === 401) {

                        console.log("[AuthProvider] 401 Unauthorized")

                        try {
                            //Check if refreshToken is still valid
                            const response = await axios.post(CONFIG.refreshToken);

                            setToken(response.data.token);
                            originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
                            originalRequest._retry = true;

                            return axios(originalRequest);

                        } catch (error) {
                            console.error('Failed to refresh token');
                        }
                }
                return Promise.reject(error);
            } 
        );

        return () => {
            axios.interceptors.request.eject(authInterceptor);
        }

    }, [token]);    //This runs whenever the token changes

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );

}


export default AuthProvider;