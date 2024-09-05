import { useEffect, useState } from "react";
import { useQuery } from '@apollo/client';
import questQuery from "../queries/questQuery";

const useQuest = (cardId, step) => {

    const { loading, error, data } = useQuery(questQuery.FIND_QUEST_GAMESTEP, {
        variables: { cardId, step },
        context: {
            requiresAuth: false
        },
    });

    const [quest, setQuest] = useState([]);

    useEffect(() => {
        if (!loading && !error && data) {
            setQuest(data.findQuestByGameStep);
        }

    }, [loading, error, data]);

    return {quest}
}

export default useQuest