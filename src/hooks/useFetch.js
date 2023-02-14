import { useEffect, useState } from 'react';

const useFetch = (url, options) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await fetch(url, options);
                const json = await res.json();
                setResponse(json);
                setLoading(false);
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, [url, options]);

    return { response, error, loading };
}

export default useFetch;