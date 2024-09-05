import axios from "axios";
import { useState } from "react";
import CONFIG from "../utils/constants";

const useRoute = () => {
    const [route, setRoute] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async (start, end) => {
        setLoading(true);
        try {
            const response = await axios.post(CONFIG.pathfind, { start, end });
            setRoute(response.data.instructions);
            setError(null);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { fetchData, route, loading, error };
};

export default useRoute;