import { useCallback, useEffect, useState } from "react";
import { gql, useQuery } from '@apollo/client';
import questQuery from '../queries/questQuery';

const useCheckAns = (code, answer) => {

    const [response, setResponse] = useState(false);

    const { loading, error, data } = useQuery(questQuery.CHECK_QUEST_ANS, {
        variables: { code, answer: answer},
        context: {
            requiresAuth: false
        },
    });

    useEffect(() => {
        if (!loading && !error && data) {
            setResponse(data.checkAns);
        }
    }, [loading, error, data]);

    return {
        isCorrect: response.correct,
        finished: response.finished,
        loading
    }
}

export default useCheckAns