import { useEffect, useCallback } from "react";
import { useMutation } from '@apollo/client';
import userMutation from "../queries/userQuery";

const useCardProgressUpdate = ({cardCode, step}) => {

    //const [progress, setProgress] = useState({finish: false, currentStep: 1});

    const [updateProgress, { data, loading, error }] = useMutation(userMutation.UPDATE_CARD_PROGRESS);

    useEffect(() => {
        const handleUpdate = async () => {
            try {
                const response = await updateProgress({
                    variables: { cardCode, step },
                    context: {
                        requiresAuth: true,
                    },
                });
                console.log('Mutation response:', response);
            } catch (err) {
                console.error('Mutation error:', err);
            }
        };

        handleUpdate();
    }, [cardCode, step, updateProgress]); // Agrega las dependencias necesarias aquí


    return {
        finished: data?.updateCardStatus.finish || false,
        currentStep: data?.updateCardStatus.currentStep || step,
        loading,
        error
    }
}

export default useCardProgressUpdate