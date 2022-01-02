import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setisPending] = useState(true);
    const [error, seterror] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            fetch(url)
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
                    setisPending(false);
                    seterror(err.message);
                })
        }, 1000);
    }, [url]);

    return { data, isPending, error };
}

export default useFetch;