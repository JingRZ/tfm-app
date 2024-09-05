import { useEffect, useState } from "react";
import { useQuery } from '@apollo/client';
import cardQuery from "../queries/cardQuery";


const useCardByCode = (code) => {

    const [card, setCard] = useState();

    const { loading, error, data } = useQuery(cardQuery.FIND_CARD, {
        variables: { code },
        context: {
            requiresAuth: false
        },
    });

    useEffect(() => {
        if (!loading && !error && data) {
            setCard(data.findCard);
        }
    }, [loading, error, data]);

    return {card, loading}
}

export default useCardByCode