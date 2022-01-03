import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setisPending] = useState(true);
    const [error, seterror] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url, { signal: abortCont.signal })
                .then(res => {
                    console.log(res);
                    if(!res.ok){
                        throw Error('Could not fetch data from the Database');
                    }
                    return res.json();
                })
                .then(data => {
                    setData(data);
                    setisPending(false);
                    seterror(null);
                })
                .catch(err => {
                    if(err.name === 'AbortError'){
                        console.log('Fetch Aborted');
                    }
                    else{
                        setisPending(false);
                    seterror(err.message); 
                    }
                    
                })
        }, 1000);

        return () => abortCont.abort();
    }, [url]);

    return { data, isPending, error };
}

export default useFetch;