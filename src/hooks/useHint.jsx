import { useEffect, useState } from "react";
import { useQuery } from '@apollo/client';
import hintQuery from "../queries/hintQuery";

const useHint = ({cardId, step}) => {

    const [hint, setHint] = useState([]);

    const { loading, error, data } = useQuery(hintQuery.FIND_HINT, {
        variables: {
            cardId,
            step
        },
        context: {
            requiresAuth: false
        },
    });

    useEffect(() => {
        if (!loading && !error && data) {
            setHint(data.findHint);
        }
    }, [loading, error, data]);

    return { loading, error, hint}
}

export default useHint