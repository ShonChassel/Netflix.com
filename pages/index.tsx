import { getProducts, Product } from "@stripe/firestore-stripe-payments";
import { log } from "console";
import Head from "next/head";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import Banner from "../components/Banner";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Plans from "../components/Plans";
import Row from "../components/Row";
import Top10 from "../components/Top10";
import useAuth from "../hooks/useAuth";
import useList from "../hooks/useList";
import useSubscription from "../hooks/useSubscription";
import payments from "../lib/stripe";
import { Movie } from "../typings";
import requests from "../utils/requests";

interface Props {
    netflixOriginals: Movie[];
    trendingNow: Movie[];
    topRated: Movie[];
    actionMovies: Movie[];
    comedyMovies: Movie[];
    horrorMovies: Movie[];
    romanceMovies: Movie[];
    documentaries: Movie[];
    products: Product[]
}

const Home = ({
    netflixOriginals,
    actionMovies,
    comedyMovies,
    documentaries,
    horrorMovies,
    romanceMovies,
    topRated,
    trendingNow,
    products
}: Props) => {
    
    const { loading, user } = useAuth();
    const showModal = useRecoilValue(modalState);
    const subscription = useSubscription(user)
    const movie = useRecoilValue(movieState)
    const list = useList(user?.uid)

    if (loading || subscription === null) return null;
    // if (!subscription) return <Plans  products={products}/>;

    return (
        <div
            className={`relative h-screen bg-gradient-to-b lg:h-[140vh] ${
                showModal && "!h-screen overflow-hidden"
            }`}
        >
            <Head>
                <title>Home - Netflix</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />
            <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16 overflow-y-hidden">
                <Banner netflixOriginals={netflixOriginals} />
                <section className="md:space-y-24">
                    <Top10 title="Top 10" movies={netflixOriginals} />
                    {/* <Row title="Top Rated" movies={topRated} special={true} /> */}
                    <Row title="Trending Now" movies={trendingNow} />
                    <Row title="Action Thrillers" movies={actionMovies} />
                    {/* My List */}
                    {list.length > 0 && <Row title="My List" movies={list}/>}
                    <Row title="Comedies" movies={comedyMovies} />
                    <Row title="Scary Movies" movies={horrorMovies} />
                    <Row title="Romance Movies" movies={romanceMovies} />
                    <Row title="Documentaries" movies={documentaries} />
                </section>
            </main>
            {showModal && <Modal />}
        </div>
    );
};

export default Home;

export const getServerSideProps = async () => {
    try {
        const products = await getProducts(payments, {
            includePrices: true,
            activeOnly: true,
        });

        const [
            netflixOriginals,
            trendingNow,
            topRated,
            actionMovies,
            comedyMovies,
            horrorMovies,
            romanceMovies,
            documentaries,
        ] = await Promise.all([
            fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
            fetch(requests.fetchTrending).then((res) => res.json()),
            fetch(requests.fetchTopRated).then((res) => res.json()),
            fetch(requests.fetchActionMovies).then((res) => res.json()),
            fetch(requests.fetchComedyMovies).then((res) => res.json()),
            fetch(requests.fetchHorrorMovies).then((res) => res.json()),
            fetch(requests.fetchRomanceMovies).then((res) => res.json()),
            fetch(requests.fetchDocumentaries).then((res) => res.json()),
        ]);

        return {
            props: {
                netflixOriginals: netflixOriginals?.results || [], // Use an empty array as a fallback if netflixOriginals is undefined
                trendingNow: trendingNow?.results || [],
                topRated: topRated?.results || [],
                actionMovies: actionMovies?.results || [],
                comedyMovies: comedyMovies?.results || [],
                horrorMovies: horrorMovies?.results || [],
                romanceMovies: romanceMovies?.results || [],
                documentaries: documentaries?.results || [],
                products,
            },
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: {
                netflixOriginals: [], // Provide an empty array as a fallback in case of an error
                trendingNow: [],
                topRated: [],
                actionMovies: [],
                comedyMovies: [],
                horrorMovies: [],
                romanceMovies: [],
                documentaries: [],
                products: [],
            },
        };
    }
};
