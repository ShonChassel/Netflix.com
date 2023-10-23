import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { DocumentData } from "firebase/firestore";
import { useRef, useState } from "react";
import Image from "next/image";
import { Movie } from "../typings";
import Thumbnail from "./Thumbnail";
import { TopTen } from "../constants/movie";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";

interface Props {
    title: string;
    movies: Movie[] | DocumentData[];
    special?: boolean;
}

function Top10({ title, movies }: Props) {
    const top10Movies = movies.slice(0, 10);
    const rowRef = useRef<HTMLDivElement>(null);
    const [isMoved, setIsMoved] = useState(false);
    const [showModal, setShowModal] = useRecoilState(modalState)
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState)


    const handleClick = (direction: string) => {
        setIsMoved(true);
        console.log(isMoved);

        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollTo =
                direction === "left"
                    ? scrollLeft - clientWidth
                    : scrollLeft + clientWidth;

            rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    return (
        <div className="h-40 space-y-0.5 md:space-y-2">
            <h2
                className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200
             hover:text-white md:text-2xl"
            >
                {title}
            </h2>

            <div className="group relative md:-ml-2">
                <ChevronLeftIcon
                    className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer
                    opacity-0 transition hover:scale-125 group-hover:opacity-100 ${!isMoved && "hidden"
                        }`}
                    onClick={() => handleClick("left")}
                />

                <div
                    ref={rowRef}
                    className="topTen-container flex scrollbar-hide space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2 h-[206px]"
                >
                    {top10Movies.map((movie, i) => (
                        <>
                            <div className="topTen" onClick={() => {
                                setCurrentMovie(movie)
                                setShowModal(true)
                            }}>
                                <Image className="" src={TopTen[i]} width={100} height={100} alt="" />
                                <Image
                                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                    className="topTenImg rounded-sm object-cover md:rounded max-h-[200px] w-auto "
                                    layout="fill"
                                    alt=""
                                />


                            </div>
                        </>
                    ))}

                </div>

                <ChevronRightIcon
                    className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer
                               opacity-0 transition hover:scale-125 group-hover:opacity-100"
                    onClick={() => handleClick("right")}
                />
            </div>
        </div>
    );
}

export default Top10;