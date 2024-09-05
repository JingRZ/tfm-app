import axios from "axios";
import { useState } from "react";
import CONFIG from "../utils/constants";

const useLocation = () => {
    const [location, setLocation] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const fetchLocation = async (data) => {
        setLoading(true);
        try {
            console.log("CONFIG.whereami: ", CONFIG.whereami);
            const response = await axios.post(CONFIG.whereami, { data });
            console.log(response.data);
            setLocation(response.data.name);
            setError(null);
        } catch (error) {
            console.log(error); 
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { fetchLocation, location, loading, error };
};

export default useLocation;