import { useEffect, useState } from "react";
import { useQuery } from '@apollo/client';
import adQuery from "../queries/adQuery";


const useAd = (code) => {

    const [ad, setAd] = useState(null);
    const { loading, error, data } = useQuery(adQuery.FIND_AD, {
        variables: { code },
        context: {
            requiresAuth: false
        },
    });

    useEffect(() => {
        if (!loading && !error && data) {
            setAd(data.findAd);
        }
    }, [loading, error, data]);

    return {ad, loading}
}

export default useAd