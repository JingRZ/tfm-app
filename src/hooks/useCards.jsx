import { useCallback, useEffect, useState } from "react";
import { gql, useQuery } from '@apollo/client';
import cardQuery from "../queries/cardQuery";

const useCards = () => {

    const [cards, setCards] = useState([]);

    const { loading, error, data, refetch } = useQuery(cardQuery.ALL_CARDS, {
        context: {
            requiresAuth: false
        },
    });

    useEffect(() => {
        if(error){
            alert("Error fetching cards: ", error);
        }
        if (!loading && !error && data) {
            setCards(data.allCards);
        }
    }, [loading, error, data]);

    return {cards, refetch}
}

export default useCards