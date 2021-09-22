import { getData } from "lib/fu-data";
import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";

export const Home = (): JSX.Element => {

    const [data, setData] = useState<any>({});

    useEffect(() => {
        getData().then(setData);
    }, []);

    console.log(data);

    return (
        <Layout>
            <h1 className="text-2xl text-white">What a nice website</h1>
            <p>Hello there!</p>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </Layout>
    );
};

export default Home;
