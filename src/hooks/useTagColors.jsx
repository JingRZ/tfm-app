import { useEffect, useState } from "react";
import { gql, useQuery } from '@apollo/client';

const GET_CARDS = gql`
    query allTagColors {
        allTagColors {
            tagName
            color
        }
    }
`

const useTagColors = () => {

    const [tagColors, setTagColors] = useState([]);

    const { loading, error, data } = useQuery(GET_CARDS);
    
    useEffect(() => {
        if (!loading && !error && data) {
            setTagColors(data.allTagColors);
        }
    }, [loading, error, data]);

    return {tagColors: tagColors}
}

export default useTagColors