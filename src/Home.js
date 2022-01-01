//import { click } from "@testing-library/user-event/dist/click";
import { useState, useEffect } from "react";
import BlogList from "./BlogList";

const Home = () => {
    const [blogs, setblogs] = useState(null);
    const [isPending, setisPending] = useState(true);
    const [error, seterror] = useState(null);


    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:8000/blogs')
                .then(res => {
                    console.log(res);
                    if(!res.ok){
                        throw Error('Could not fetch data from the Database');
                    }
                    return res.json();
                })
                .then(data => {
                    setblogs(data);
                    setisPending(false);
                    seterror(null);
                })
                .catch(err => {
                    setisPending(false);
                    seterror(err.message);
                })
        }, 1000);
    }, []);

    return (
        <div className="home">
            {error &&  <div>{error}</div> }
            {isPending && <div>Loading...</div>}
            {blogs && <BlogList blogs={blogs} title="All Blogs"/>}
        </div>
    );
}
 
export default Home;