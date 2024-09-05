import { useState } from "react";
import { useMutation } from '@apollo/client';
import userMutation from "../queries/userQuery";

const useReqSessionToken = () => {

    const [token, setToken] = useState("");
    const [error, setError] = useState(null);

    const [sessionTokenRefreshFunction] = useMutation(userMutation.REFRESH_SESSION_TOKEN);

    const handleRequestSessionTokenRefresh = async () => {
        try {
            const refreshToken = await SessionManager.getRefreshToken();

            const { data, errors } = await sessionTokenRefreshFunction({
                variables: { refreshToken },
            });
            if(errors) setError(errors[0].message)
            if (data && data.login) {
                setToken(data.refreshSessionToken.token);
                setError(null); 
            }
        } catch (error) {
            console.error('Error at handleRequestSessionTokenRefresh:', error);
        } 
    };

    return {
        token,
        error,
        handleRequestSessionTokenRefresh,
    };
}

export default useReqSessionToken