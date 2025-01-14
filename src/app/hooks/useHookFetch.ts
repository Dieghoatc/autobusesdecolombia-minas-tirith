import { useState, useEffect } from "react";
import { ApiResponse } from "../api/autobusesApi.adapter";

export function useHookFetch( fetchFunction: () => Promise<ApiResponse[]> ) {

    const [data, setData] = useState<ApiResponse[]>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)

    useEffect(() => {
        try {
            fetchFunction().then((data: ApiResponse[]) => {
                setData(data);
                setLoading(false);
            });
        }
        catch (error) {
            console.log(error);
            setError(true);
        } finally {
            setLoading(false);
        }
        
    }, [fetchFunction]);

    return { data, loading, error };

}