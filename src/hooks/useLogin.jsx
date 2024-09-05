import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import CONFIG from "../utils/constants";

const useLogin = () => {
    const {token, setToken} = useContext(AuthContext);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("[useLogin] token updated: ", token);
    }, [token]);
    

    const handleLogin = async ({ username, password }) => {
        try {
            const response = await axios.post(CONFIG.login, {
                username,
                password,
            });

            const { data } = response;

            if (data.token) {
                setToken(data.token);
                setError(null);
            }
            
        } catch (error) {
            let errorStatus = error.response?.status;

            switch(errorStatus) {
                case 401:
                    setError('Invalid credentials');
                    break;
                default:
                    setError('An error occurred during login.');
            }
        } 
    }

    return {
        error,
        handleLogin,
    };
}

export default useLogin