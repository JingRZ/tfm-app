import axios from "axios";
import { useState } from "react";
import CONFIG from "../utils/constants";

const useRouteInstr = () => {
    const [instr, setInstr] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchInstr = async (start, end) => {
        setLoading(true);
        try {
            const response = await axios.post(CONFIG.pathfindnextinstr, { start, end });
            setInstr(response.data.instructions);
            setError(null);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { fetchInstr, instr, loading, error };
};

export default useRouteInstr;