import { useCallback, useEffect, useState } from "react";
import { gql, useQuery } from '@apollo/client';
import userQuery from "../queries/userQuery";

const useUser = () => {

    const [user, setUser] = useState();

    const { error, data, loading, refetch } = useQuery(userQuery.ME, {
        context: {
            requiresAuth: true
        },
    }
    );

    useEffect(() => {
        if (!loading && !error && data) {
            setUser(data.me);
        }

        
    }, [error, data]);

    return {
        user, 
        error,
        refetch}
}

export default useUser